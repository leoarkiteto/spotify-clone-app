<script lang="ts" setup>
interface Props {
  image: string;
  title: string;
  subtitle: string;
}

const props = defineProps<Props>();
</script>

<template>
  <RouterLink to="library">
    <div class="cursor-pointer rounded-md bg-[#111] p-4 hover:bg-[#252525]">
      <img :alt="props.title" :src="props.image" class="rounded-md" />
      <p class="pt-4 text-[17px] font-semibold text-white">{{ props.title }}</p>
      <p class="pb-3 pt-1 text-[14px] text-gray-400">{{ props.subtitle }}</p>
    </div>
  </RouterLink>
</template>

<style scoped></style>
