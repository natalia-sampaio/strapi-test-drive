export default [
    "strapi::logger",
    "strapi::errors",
    {
        name: "strapi::cors",
        config: {
            origin: ["http://localhost:3000"],
        },
    },
    "strapi::poweredBy",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
    {
        name: "strapi::security",
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    "script-src": [
                        "'self'",
                        "'unsafe-eval'",
                        "https://cdn.ckeditor.com",
                    ],
                    "frame-src": [
                        "'self'",
                        "youtube.com",
                        "www.youtube.com",
                        "vimeo.com",
                        "*.vimeo.com",
                        "facebook.com",
                        "www.facebook.com",
                    ],
                    "connect-src": [
                        "'self'",
                        "https:",
                        "https://proxy-event.ckeditor.com",
                    ],
                    "img-src": [
                        "'self'",
                        "data:",
                        "blob:",
                        "market-assets.strapi.io",
                        "res.cloudinary.com",
                        "*.strapiapp.com",
                    ],
                    "media-src": [
                        "'self'",
                        "data:",
                        "blob:",
                        "market-assets.strapi.io",
                        "res.cloudinary.com",
                        "*.strapiapp.com",
                    ],

                    upgradeInsecureRequests: null,
                },
            },
        },
    },
];
