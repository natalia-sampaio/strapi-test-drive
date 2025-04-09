export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const slug = getRouterParam(event, "slug");

    if (!slug) {
        throw createError({ statusCode: 400, message: "Missing slug" });
    }

    try {
        const response = await $fetch(`${config.public.apiBase}/api/articles`, {
            headers: {
                Authorization: `Bearer ${config.apiToken}`,
            },
            query: {
                "filters[slug][$eq]": slug,
                populate: "cover",
            },
        });

        const article = response?.data?.[0];

        if (!article) {
            throw createError({
                statusCode: 404,
                message: "Article not found",
            });
        }

        return article;
    } catch (err) {
        console.error(
            "Error fetching article:",
            err.data || err.message || err
        );
        throw createError({
            statusCode: 500,
            message: "Internal Server Error",
        });
    }
});
