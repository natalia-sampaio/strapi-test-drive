export default defineEventHandler(async () => {
    const config = useRuntimeConfig();

    const data = await $fetch(
        `${config.public.apiBase}/api/articles?populate=cover`,
        {
            headers: {
                Authorization: `Bearer ${config.apiToken}`,
            },
        }
    );

    return data;
});
