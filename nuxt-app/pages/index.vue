<script setup lang="ts">
const { data: articles, error } = await useFetch("/api/articles");
console.log(articles.value);
function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}
</script>

<template>
    <UContainer class="py-10">
        <div v-if="error" class="text-red-500">
            Error loading articles:
            {{ error }}
        </div>
        <div v-else-if="!articles">Loading...</div>

        <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <UCard
                v-for="article in articles.data"
                :key="article.id"
                class="hover:shadow-lg transition">
                <template #header>
                    <img
                        :src="article.cover?.url"
                        class="w-full h-auto rounded object-cover aspect-[16/9]" />
                    <div
                        class="text-xl font-semibold text-primary hover:underline">
                        {{ article.title }}
                    </div>
                    <div class="text-sm text-gray-500">
                        {{ formatDate(article.publishedAt) }}
                    </div>
                </template>
                <template #footer>
                    <NuxtLink
                        :to="`/${article.slug}`"
                        class="text-sm text-primary hover:underline">
                        Read more →
                    </NuxtLink>
                </template>
            </UCard>
        </div>
    </UContainer>
</template>
