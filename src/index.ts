import _fastify from "fastify";
import Knex from "knex";

import { dbConfig } from '../config';

const knex = Knex({
  client: "mysql",
  connection: dbConfig
});

const fastify = _fastify({
  logger: true
});

const PORT = process.env.PORT || "3030";

// Declare a route
fastify.get("/", async (request, reply) => {
  try {
    const results = await knex.select().from("3formbuzz");
    reply.send({ response: results });
  } catch (err) {
    throw err;
  }
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(PORT);
    fastify.log.info(`server listening on http://${(fastify.server.address() as any)['address']}:${(fastify.server.address() as any)['port']}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
