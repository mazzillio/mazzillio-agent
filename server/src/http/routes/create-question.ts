import { and, desc, eq, sql } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { generateAnswer, generateEmbeddings } from "../../services/gemini.ts";
export const createQuestion: FastifyPluginCallbackZod = (fastify) => {
  fastify.post(
    "/rooms/:roomId/questions",
    {
      schema: {
        body: z.object({
          question: z.string().min(1),
        }),
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async ({ body, params }, reply) => {
      // TODO ADD VALIDATION for name exists of room
      const { question } = body;
      const { roomId } = params;

      const embeddings = await generateEmbeddings(question);
      const embeddingsAsString = `[${embeddings.join(",")}]`;

      const chunks = await db
        .select({
          id: schema.audioChunks.id,
          transciption: schema.audioChunks.transciption,
          similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`,
        })
        .from(schema.audioChunks)
        .where(
          and(
            eq(schema.audioChunks.roomId, roomId),
            sql`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector) > 0.7`
          )
        )
        .orderBy(
          desc(
            sql`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`
          )
        )
        .limit(3);

      //.limit(3);
      console.log(JSON.stringify(chunks, null, 2));
      let answer: string | null = null;
      if (chunks.length > 0) {
        const transciptions = chunks.map((chunk) => chunk.transciption);
        answer = await generateAnswer(question, transciptions);
      }

      const [createdQuestion] = await db
        .insert(schema.questions)
        .values({ question, roomId, answer })
        .returning();
      if (!createdQuestion) {
        throw new Error("Failed to create question");
      }
      return reply.status(201).send({
        questionId: createdQuestion.id,
        answer,
      });
    }
  );
};
