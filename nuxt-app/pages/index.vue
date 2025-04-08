<script setup>
const config = useRuntimeConfig();
const { data: articles, error } = await useAsyncData("articles", () =>
    $fetch("/api/articles", {
        baseURL: config.public.apiBase,
        headers: process.server
            ? { Authorization: `Bearer ${config.apiToken}` }
            : undefined,
    })
);
</script>

<template>
    <div>
        <div v-if="error">Error loading posts: {{ error.message }}</div>
        <ul v-else>
            <li v-for="article in articles.data" :key="article.id">
                <NuxtLink :to="`/${article.slug}`">
                    {{ article.title }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>
