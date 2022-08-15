module.exports = {
  mode: "universal",
  server: {
    host: "0.0.0.0",
    port: "3000",
  },
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  css: [{ src: "~/assets/app.css", lang: "css" }],
  plugins: [
    { src: "~/plugins/filters.client.js" },
    { src: "~/plugins/socket.client.js" },
    { src: "~/plugins/vuetify.js" },
  ],
  buildModules: [],
  modules: ["@nuxtjs/pwa"],
  pwa: {
    manifest: {
      name: "Live Chat",
      short_name: "Chat",
      start_url: "/",
      theme_color: "#424242",
      display: "standalone",
    },
    icon: {
      iconSrc: "./static/favicon.ico",
    },
  },
  build: {
    extend(config, ctx) {
      
    },
  },
};
