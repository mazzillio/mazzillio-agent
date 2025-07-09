import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { createRoom } from "./http/routes/create-room.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();
const PORT = env.PORT;

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.withTypeProvider<ZodTypeProvider>();

app.get("/health", (req, res) => {
  res.send({ status: "ok" });
});
app.register(getRoomsRoute);
app.register(createRoom);

app.listen({ port: PORT }).then(() => {
  console.log(`Server is now running on port ${PORT}`);
});
