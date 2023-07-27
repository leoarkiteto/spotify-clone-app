<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

interface Props {
  iconString: string;
  iconSize: number;
  pageUrl: string;
  name: string;
}

const props = defineProps<Props>();

const icon = ref<string | null>(null);
const textIsHover = ref(false);

watchEffect(() => {
  if (route.path === props.pageUrl) {
    icon.value = `${props.iconString}-active`;
    textIsHover.value = true;
  } else {
    icon.value = `${props.iconString}-inactive`;
    textIsHover.value = false;
  }
});

function isHover() {
  if (icon.value === `${props.iconString}-active`) return;

  if (icon.value === `${props.iconString}-inactive`) {
    icon.value = `${props.iconString}-inactive-hover`;
    textIsHover.value = true;
  } else {
    icon.value = `${props.iconString}-inactive`;
    textIsHover.value = false;
  }
}
</script>

<template>
  <li
    class="flex cursor-pointer items-center pb-4"
    @focusin="isHover"
    @focusout="isHover"
    @mouseenter="isHover"
    @mouseleave="isHover"
  >
    <img :src="`/images/icons/${icon}.png`" :width="iconSize" alt="" />
    <div
      :class="textIsHover ? 'text-white' : 'text-gray-400'"
      class="ml-4 mt-0.5 text-[14px] font-semibold"
    >
      <span :class="route.path === pageUrl ? 'text-white' : ''">{{
        props.name
      }}</span>
    </div>
  </li>
</template>
