<script lang="ts" setup>
interface Props {
  image: string;
  title: string;
  subtitle: string;
}

defineProps<Props>();
</script>

<template>
  <RouterLink :to="{ name: 'library' }">
    <div class="cursor-pointer rounded-md bg-[#111] p-4 hover:bg-[#252525]">
      <img :alt="title" :src="image" class="rounded-md" />
      <p class="pb-1 pt-4 text-[17px] font-semibold text-white">{{ title }}</p>
      <p class="pb-3 text-[14px] text-gray-400">{{ subtitle }}</p>
    </div>
  </RouterLink>
</template>
