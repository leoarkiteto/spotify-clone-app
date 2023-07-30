<script lang="ts" setup>
interface Props {
  imageId: number;
  playlist: string;
  category: string;
  title: string;
}

defineProps<Props>();
</script>

<template>
  <RouterLink :to="{ name: 'library' }">
    <div class="flex items-center rounded-md bg-black p-2 hover:bg-[#252525]">
      <img
        :src="`https://picsum.photos/id/${imageId}/300/300`"
        alt=""
        class="mr-3 rounded-md"
        width="40" />

      <div class="flex-col">
        <p class="text-white">{{ playlist }}</p>

        <div
          class="flex items-center space-x-1 text-[12px] font-light text-gray-400">
          <p>{{ category }}</p>
          <span class="h-[3px] w-[3px] rounded-full bg-white"></span>
          <p>{{ title }}</p>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
