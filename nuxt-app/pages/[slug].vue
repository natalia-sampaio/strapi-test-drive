<script setup>
import { useEmbedParser } from "@/composables/useEmbedParser";
const route = useRoute();
const config = useRuntimeConfig();

const { data: article, error } = await useFetch(`/api/articles`, {
    baseURL: config.public.apiBase,
    headers: process.server
        ? { Authorization: `Bearer ${config.apiToken}` }
        : undefined,
    params: {
        "filters[slug][$eq]": route.params.slug,
    },
    transform: (res) => res.data,
});

const rawHtml = article.value[0].body;
const parsedHtml = useEmbedParser(rawHtml);
</script>

<template>
    <div v-if="error">Error loading post: {{ error.message }}</div>
    <div v-else-if="!article?.[0]">Post not found.</div>
    <div v-else>
        <h1>{{ article[0].title }}</h1>
        <div v-html="parsedHtml" />
    </div>
</template>
