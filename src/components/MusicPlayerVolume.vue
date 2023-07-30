<script lang="ts" setup>
import { storeToRefs } from "pinia";
import VolumeMute from "vue-material-design-icons/VolumeMute.vue";
import VolumeHigh from "vue-material-design-icons/VolumeHigh.vue";

import { useSongStore } from "@/stores/song";
import { onMounted, ref } from "vue";

const useSong = useSongStore();
const { audio } = storeToRefs(useSong);
const isHover = ref(false);
const vol = ref(80);
const volume = ref<HTMLInputElement | null>(null);

onMounted(() => {
  volume.value!.addEventListener("input", (evt: InputEvent) => {
    audio.value!.volume = evt.currentTarget.value / 100;
  });
});
</script>

<template>
  <VolumeMute v-if="vol == 0" :size="20" fill-color="#fff" />
  <VolumeHigh v-else :size="20" fill-color="#fff" />

  <div
    class="relative mb-[23px] ml-2 mt-2 flex w-[150px] items-center"
    @focusin="isHover = true"
    @focusout="isHover = false"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false">
    <label for="volume">
      <input
        id="volume"
        ref="volume"
        v-model="vol"
        :class="{ rangeDotHidden: !isHover }"
        class="absolute z-40 my-2 h-0 w-full appearance-none rounded-full bg-opacity-100 accent-white focus:outline-none"
        type="range" />
    </label>

    <div
      :class="isHover ? 'bg-green-500' : 'bg-white'"
      :style="`width: ${vol}%;`"
      class="pointer-events-none absolute inset-y-0 left-0 z-10 mt-[6px] h-[4px] w-0"></div>

    <div
      class="absolute inset-y-0 left-0 z-[0] mt-[6px] h-[4px] w-full rounded-full bg-gray-500"></div>
  </div>
</template>

<style scoped>
.rangeDotHidden[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
}
</style>
