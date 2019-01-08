import _fastify from "fastify";
import Knex from "knex";

const knex = Knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "3form",
    password: "3formusa",
    database: "3formusa"
  }
});

const fastify = _fastify();

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
    fastify.log.info(`server listening on ${fastify.server.address()}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
