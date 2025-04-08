// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxt/ui"],
    css: ["~/assets/main.css"],
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    runtimeConfig: {
        apiToken: process.env.STRAPI_API_READONLY_TOKEN,
        public: {
            apiBase: process.env.STRAPI_API_BASE_URL || "http://localhost:1337",
        },
    },
});
