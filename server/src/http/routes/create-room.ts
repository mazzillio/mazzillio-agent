import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
export const createRoom: FastifyPluginCallbackZod = (fastify) => {
  fastify.post(
    "/rooms",
    {
      schema: {
        body: z.object({
          name: z.string().min(1),
          description: z.string().optional(),
        }),
      },
    },
    async ({ body }, reply) => {
      // TODO ADD VALIDATION for name exists of room
      const { name, description } = body;
      const [room] = await db
        .insert(schema.rooms)
        .values({ name, description })
        .returning();
      if (!room) {
        throw new Error("Failed to create room");
      }
      return reply.status(201).send({ roomId: room.id });
    }
  );
};
