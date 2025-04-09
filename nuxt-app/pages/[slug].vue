<script setup lang="ts">
import { useEmbedParser } from "@/composables/useEmbedParser";

const route = useRoute();
const { find } = useStrapi();

const { data: result, error } = await useAsyncData("article", async () =>
    find("articles", {
        populate: ["cover"],
        filters: {
            slug: {
                $eq: route.params.slug,
            },
        },
    })
);

const article = computed(() => result.value?.data?.[0] || null);
const rawHtml = article.value?.body;
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
        <UCard v-if="article">
            <template #header>
                <img
                    :src="article.cover?.url"
                    class="w-full h-auto rounded object-cover aspect-[16/9]" />
                <h1 class="text-3xl font-bold">{{ article.title }}</h1>
                <p class="text-sm text-gray-500 mt-1">
                    Published on {{ formatDate(article.createdAt) }}
                </p>
            </template>

            <div
                v-html="parsedHtml"
                class="prose dark:prose-invert prose-neutral max-w-none" />

            <template #footer>
                <div class="text-right text-sm text-gray-400">
                    Last updated: {{ formatDate(article.updatedAt) }}
                </div>
            </template>
        </UCard>

        <div v-else-if="error" class="text-red-500">
            Failed to load article: {{ error.message || "Unknown error" }}
        </div>

        <div v-else>Loading article...</div>
    </div>
</template>
