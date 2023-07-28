<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import Heart from "vue-material-design-icons/Heart.vue";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import SkipBackward from "vue-material-design-icons/SkipBackward.vue";
import SkipForward from "vue-material-design-icons/SkipForward.vue";
import PictureInPictureBottomRight from "vue-material-design-icons/PictureInPictureBottomRight.vue";

import { useSongStore } from "@/stores/song";

const useSong = useSongStore();
const { isPlaying, audio, currentArtist, currentTrack } = storeToRefs(useSong);

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
      useSong.nextSong(currentTrack.value);
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
          :src="currentArtist.albumCover"
          alt="album"
          class="rounded-sm shadow-2xl"
          width="55"
        />
        <div class="ml-4">
          <p class="cursor-pointer text-[14px] text-white hover:underline">
            {{ currentTrack.name }}
          </p>
          <p
            class="cursor-pointer text-[11px] text-gray-400 hover:text-white hover:underline"
          >
            {{ currentTrack.name }}
          </p>
        </div>
      </div>

      <div class="ml-8 flex items-center">
        <Heart :size="20" fill-color="#1bd760" />
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
              @click="useSong.prevSong(currentTrack)"
            />
          </button>
          <button
            class="mx-3 rounded-full bg-white p-1"
            type="button"
            @click="useSong.playOrPauseThisSong(currentArtist, currentTrack)"
          >
            <Play v-if="!isPlaying" :size="25" fill-color="#181818" />
            <Pause v-else :size="25" fill-color="#181818" />
          </button>
          <button class="mx-2" type="button">
            <SkipForward
              :size="25"
              fill-color="#fff"
              @click="useSong.nextSong(currentTrack)"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>