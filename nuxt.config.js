module.exports = {
  mode: "universal",
  head: {
    title: "Блог" || process.env.npm_package_name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;1,300&display=swap"
      }
    ]
  },
  loading: { color: "#66B1FF" },

  css: ["element-ui/lib/theme-chalk/index.css", "@/theme/index.scss"],

  plugins: ["@/plugins/globals", "@/plugins/axios"],

  buildModules: ["@nuxtjs/moment"],

  modules: ["@nuxtjs/axios", "@nuxtjs/pwa"],

  moment: {
    defaultLocale: "ru",
    locales: ["ru"]
  },

  axios: {
    baseURL: process.env.BASE_URL || "http://localhost:3000"
  },

  env: {
    appName: "KDV"
  },

  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {}
  }
};
