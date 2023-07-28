<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import Heart from "vue-material-design-icons/Heart.vue";

import { useSongStore } from "@/stores/song";

interface Props {
  track: {
    name: string;
    value: {
      path: string;
    };
  };
  artist: {
    name: string;
  };
  index: number;
}

const props = defineProps<Props>();

const useSong = useSongStore();
const { isPlaying, currentTrack } = storeToRefs(useSong);
const isHover = ref(false);
const isTrackTime = ref<string | null>(null);

onMounted(() => {
  const audio = new Audio(props.track.value.path);
  audio.addEventListener("loadedmetadata", () => {
    const { duration } = audio;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    isTrackTime.value = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  });
});
</script>

<template>
  <li
    class="flex items-center justify-between rounded-md hover:bg-[#2a2929]"
    @focusin="isHover = true"
    @focusout="isHover = false"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="flex w-full items-center py-1.5">
      <div v-if="isHover" class="mr-[6px] w-[40px] cursor-pointer">
        <Play
          v-if="!isPlaying"
          :size="25"
          fill-color="#fff"
          @click="useSong.playOrPauseThisSong(artist, track)"
        />
        <Play
          v-else-if="isPlaying && currentTrack.name !== track.name"
          :size="25"
          fill-color="#fff"
          @click="useSong.loadSong(artist, track)"
        />
        <Pause
          v-else
          :size="25"
          fill-color="#fff"
          @click="useSong.playOrPauseSong"
        />
      </div>

      <div v-else class="ml-5 w-[40px] font-semibold text-white">
        <span
          :class="{
            'text-green-500': currentTrack?.name === track.name,
          }"
          >{{ index }}</span
        >
      </div>

      <div>
        <div
          :class="{
            'text-green-500': currentTrack?.name === track.name,
          }"
          class="font-semibold text-white"
        >
          {{ track.name }}
        </div>
        <div class="text-sm font-semibold text-gray-400">
          {{ artist.name }}
        </div>
      </div>
    </div>

    <div class="flex items-center">
      <button v-if="isHover" type="button">
        <Heart />
      </button>
      <div v-if="isTrackTime" class="mx-5 text-xs text-gray-400"
        >{{ isTrackTime }}
      </div>
    </div>
  </li>
</template>
