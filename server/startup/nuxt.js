const { Nuxt, Builder } = require("nuxt");
const consola = require("consola");

// Import and Set Nuxt.js options
const config = require("../../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

module.exports = async function (app, server) {
  const nuxt = new Nuxt(config);
  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  server.listen(port, host);

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
};
