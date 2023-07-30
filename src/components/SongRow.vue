<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { Vue3Lottie } from "vue3-lottie";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import HeartOutline from "vue-material-design-icons/HeartOutline.vue";

import { useSongStore } from "@/stores/song";
import Spotify from "@/assets/spotify.json";

type Track = {
  id: number;
  name: string;
  path: string;
};
type Artist = {
  name: string;
  albumCover: string;
  releaseYear: string;
  tracks: Track[];
};

const props = defineProps<{ index: number; track: Track; artist: Artist }>();

const useSong = useSongStore();
const { isPlaying, currentTrack } = storeToRefs(useSong);
const isHover = ref(false);
const isTrackTime = ref<string | null>(null);
const liked = ref(false);

onMounted(() => {
  const audio = new Audio(props.track.path);
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
    @mouseleave="isHover = false">
    <div class="flex w-full items-center py-1.5">
      <div v-if="isHover" class="mr-[6px] w-[40px] cursor-pointer">
        <Play
          v-if="!isPlaying"
          :size="25"
          fill-color="#fff"
          @click="useSong.playOrPauseThisSong(artist, track)" />
        <Play
          v-else-if="isPlaying && currentTrack.name !== track.name"
          :size="25"
          fill-color="#fff"
          @click="useSong.loadSong(artist, track)" />
        <Pause
          v-else
          :size="25"
          fill-color="#fff"
          @click="useSong.playOrPauseSong" />
      </div>

      <div v-else class="mr-2 w-[40px] text-center font-semibold text-white">
        <span v-if="isPlaying && currentTrack.name === track.name">
          <Vue3Lottie :animation-data="Spotify" :height="30" :width="30" />
        </span>
        <span
          v-else
          :class="{
            'text-green-500': currentTrack?.name === track.name,
          }"
          >{{ index }}</span
        >
      </div>

      <div>
        <div
          :class="
            currentTrack?.name === track.name ? 'text-green-500' : 'text-white'
          "
          class="font-semibold">
          {{ track.name }}
        </div>
        <div class="text-sm font-semibold text-gray-400">
          {{ artist.name }}
        </div>
      </div>
    </div>

    <div class="flex items-center">
      <button v-if="isHover" type="button" @click="liked = !liked">
        <Heart v-if="liked" fill-color="#1bd760" />
        <HeartOutline v-else fill-color="#c2c2c2" />
      </button>
      <div v-if="isTrackTime" class="mx-5 text-xs text-gray-400"
        >{{ isTrackTime }}
      </div>
    </div>
  </li>
</template>
