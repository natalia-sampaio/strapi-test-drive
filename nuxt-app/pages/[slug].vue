<script setup lang="ts">
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
        populate: ["cover"],
    },
    transform: (res) => res.data,
});

const rawHtml = article.value[0].body;
const parsedHtml = useEmbedParser(rawHtml);

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
</script>

<template>
    <div class="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <UCard>
            <template #header>
                <img
                    :src="config.public.apiBase + article[0].cover.url"
                    class="w-full h-auto rounded object-cover aspect-[16/9]" />
                <h1 class="text-3xl font-bold">{{ article[0].title }}</h1>
                <p class="text-sm text-gray-500 mt-1">
                    Published on {{ formatDate(article[0].createdAt) }}
                </p>
            </template>

            <div
                v-html="parsedHtml"
                class="prose dark:prose-invert prose-neutralmax-w-none" />

            <template #footer>
                <div class="text-right text-sm text-gray-400">
                    Last updated: {{ formatDate(article[0].updatedAt) }}
                </div>
            </template>
        </UCard>
    </div>
</template>
