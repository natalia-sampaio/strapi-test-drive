// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxt/ui", "@nuxtjs/strapi"],
    css: ["~/assets/main.css"],
    strapi: {
        url: process.env.STRAPI_API_BASE_URL,
        prefix: "/api",
    },
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
});
