import { reset, seed } from "drizzle-seed";
import { client, db } from "./connection.ts";
import { schema } from "./schema/index.ts";

await reset(db, schema);
await seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 20,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
      with: {
        questions: 5,
      },
    },
  };
});
await client.end();

// biome-ignore lint/suspicious/noConsole: <only use dev>
console.log("Database seeded");
