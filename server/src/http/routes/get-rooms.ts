import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
export const getRoomsRoute: FastifyPluginCallbackZod = (fastify) => {
  fastify.get("/rooms", async () => {
    return await db
      .select({ id: schema.rooms.id, name: schema.rooms.name })
      .from(schema.rooms)
      .orderBy(schema.rooms.createdAt);
  });
};
