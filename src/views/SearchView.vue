<script lang="ts" setup>
import CategorySelect from "@/components/CategorySelect.vue";
import categoryLIst from "@/db/categoryLIst";
</script>

<template>
  <div class="p-8">
    <button
      class="cursor-pointer text-2xl font-semibold text-white hover:underline"
      type="button"
    >
      Podcast
    </button>

    <div class="py-1.5"></div>

    <div
      class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <CategorySelect
        v-for="category in categoryLIst"
        :key="category.imageID"
        :category="category.category"
        :image="`https://picsum.photos/id/${category.imageID}/300/300`"
      />
    </div>
  </div>
</template>

<style scoped></style>
