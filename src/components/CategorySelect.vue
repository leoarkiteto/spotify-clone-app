<script lang="ts" setup>
import { ref } from "vue";
import uniqolor from "uniqolor";

interface Props {
  category: string;
  image: string;
}

defineProps<Props>();
const randColor = ref("");
randColor.value = uniqolor.random().color;
</script>

<template>
  <RouterLink :to="{ name: 'library' }">
    <div
      v-if="randColor"
      :style="`background-color: ${randColor}`"
      class="relative aspect-square overflow-hidden rounded-xl brightness-[0.87] contrast-[2]">
      <p class="pl-4 pt-4 text-[23px] font-semibold text-white">{{
        category
      }}</p>
      <img
        :alt="category"
        :src="image || ''"
        class="absolute -right-3.5 bottom-0 max-w-[100px] rotate-[20deg] contrast-[0.55]" />
    </div>
  </RouterLink>
</template>

<style scoped></style>
