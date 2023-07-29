<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import Heart from "vue-material-design-icons/Heart.vue";
import HeartOutline from "vue-material-design-icons/HeartOutline.vue";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import SkipBackward from "vue-material-design-icons/SkipBackward.vue";
import SkipForward from "vue-material-design-icons/SkipForward.vue";
import PictureInPictureBottomRight from "vue-material-design-icons/PictureInPictureBottomRight.vue";

import MusicPlayerVolume from "@/components/MusicPlayerVolume.vue";

import { useSongStore } from "@/stores/song";

const useSong = useSongStore();
const { isPlaying, audio, currentArtist, currentTrack, likedAll } =
  storeToRefs(useSong);

const isHover = ref(false);
const isTrackTimeCurrent = ref<string | null>(null);
const isTrackTimeTotal = ref<string | null>(null);
const seeker = ref<HTMLInputElement | null>(null);
const seekerContainer = ref<HTMLElement | null>(null);
const range = ref(0);

function timeUpdate() {
  audio.value!.addEventListener("timeupdate", () => {
    const minutes = Math.floor(audio.value!.currentTime / 60);
    const seconds = Math.floor(audio.value!.currentTime - minutes * 60);
    isTrackTimeCurrent.value = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
    const value = (100 / audio.value!.duration) * audio.value!.currentTime;
    range.value = value;
    seeker.value!.value = value.toString();
  });
}

function loadMetadata() {
  audio.value!.addEventListener("loadedmetadata", () => {
    const duration = audio.value?.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    isTrackTimeTotal.value = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  });
}

onMounted(() => {
  if (audio.value) {
    setTimeout(() => {
      timeUpdate();
      loadMetadata();
    }, 300);
  }

  if (currentTrack.value) {
    seeker.value?.addEventListener("change", () => {
      audio.value!.currentTime =
        audio.value!.duration * (seeker.value!.value / 100);
    });

    seeker.value?.addEventListener("mousedown", () => {
      audio.value?.pause();
      isPlaying.value = false;
    });

    seeker.value?.addEventListener("mouseup", () => {
      audio.value?.play();
      isPlaying.value = true;
    });

    seekerContainer.value?.addEventListener("click", (e: MouseEvent) => {
      const clickPosition =
        (e.pageX - seekerContainer.value!.offsetLeft) /
        seekerContainer.value!.offsetWidth;
      const time = audio.value!.duration * clickPosition;
      audio.value!.currentTime = time;
      seeker.value!.value = String(
        (100 / audio.value!.duration) * audio.value!.currentTime
      );
    });
  }
});

watch(
  () => audio.value,
  () => {
    timeUpdate();
    loadMetadata();
  }
);

watch(
  () => isTrackTimeCurrent.value,
  time => {
    if (time && time === isTrackTimeTotal.value) {
      useSong.nextSong(currentTrack.value!);
    }
  }
);
</script>

<template>
  <div
    v-if="audio"
    id="musicPlayer"
    class="fixed bottom-0 z-50 flex h-[90px] w-full items-center justify-between border-t border-t-[#272727] bg-[#181818]"
  >
    <div class="flex w-1/4 items-center">
      <div class="ml-4 flex items-center">
        <img
          :src="currentArtist?.albumCover"
          alt="album"
          class="rounded-sm shadow-2xl"
          width="55"
        />
        <div class="ml-4">
          <p class="cursor-pointer text-[14px] text-white hover:underline">
            {{ currentTrack?.name }}
          </p>
          <p
            class="cursor-pointer text-[11px] text-gray-400 hover:text-white hover:underline"
          >
            {{ currentTrack?.name }}
          </p>
        </div>
      </div>

      <div class="ml-8 flex items-center">
        <Heart v-if="!likedAll" :size="20" fill-color="#1bd760" />
        <HeartOutline v-else :size="20" fill-color="#1bd760" />
        <PictureInPictureBottomRight
          :size="18"
          class="ml-4"
          fill-color="#fff"
        />
      </div>
    </div>

    <div class="mx-auto mb-3 w-2/4 max-w-[35%]">
      <div class="flex-col items-center justify-center">
        <div class="flex h-[30px] items-center justify-center">
          <button class="mx-2" type="button">
            <SkipBackward
              :size="25"
              fill-color="#fff"
              @click="useSong.prevSong(currentTrack!)"
            />
          </button>
          <button
            class="mx-3 rounded-full bg-white p-1"
            type="button"
            @click="useSong.playOrPauseThisSong(currentArtist!, currentTrack!)"
          >
            <Play v-if="!isPlaying" :size="25" fill-color="#181818" />
            <Pause v-else :size="25" fill-color="#181818" />
          </button>
          <button class="mx-2" type="button">
            <SkipForward
              :size="25"
              fill-color="#fff"
              @click="useSong.nextSong(currentTrack!)"
            />
          </button>
        </div>
      </div>

      <div class="flex h-[25px] items-center">
        <div
          v-if="isTrackTimeCurrent"
          class="pr-2 pt-[11px] text-[12px] text-white"
          >{{ isTrackTimeCurrent }}</div
        >
        <div
          ref="seekerContainer"
          class="relative mb-3 mt-2 w-full"
          @focusin="isHover = true"
          @focusout="isHover = false"
          @mouseenter="isHover = true"
          @mouseleave="isHover = false"
        >
          <label for="seeker">
            <input
              id="seeker"
              ref="seeker"
              v-model="range"
              :class="{ rangeDotHidden: !isHover }"
              class="absolute z-40 my-2 h-0 w-full appearance-none rounded-full bg-opacity-100 accent-white focus:outline-none"
              type="range"
            />
          </label>

          <div
            :class="isHover ? 'bg-green-500' : 'bg-white'"
            :style="`width: ${range}%;`"
            class="pointer-events-none absolute inset-y-0 left-0 z-10 mt-[6px] h-[4px] w-0"
          ></div>

          <div
            class="absolute inset-y-0 left-0 z-[0] mt-[6px] h-[4px] w-full rounded-full bg-gray-500"
          ></div>
        </div>

        <div
          v-if="isTrackTimeTotal"
          class="pl-2 pt-[11px] text-[12px] text-white"
          >{{ isTrackTimeTotal }}
        </div>
      </div>
    </div>

    <div class="flex w-1/4 items-center justify-end pr-10">
      <MusicPlayerVolume />
    </div>
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
