import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
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
      const [createdQuestion] = await db
        .insert(schema.questions)
        .values({ question, roomId })
        .returning();
      if (!createdQuestion) {
        throw new Error("Failed to create question");
      }
      return reply.status(201).send({ questionId: createdQuestion.id });
    }
  );
};
