<script lang="ts" setup>
import { storeToRefs } from "pinia";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import HeartOutline from "vue-material-design-icons/HeartOutline.vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";
import ClockTimeThreeOutline from "vue-material-design-icons/ClockTimeThreeOutline.vue";

import SongRow from "@/components/SongRow.vue";
import { useSongStore } from "@/stores/song";

import artist from "@/db/artist";
import TitleButton from "@/components/TitleButton.vue";

const useSong = useSongStore();
const { isPlaying, currentTrack, currentArtist, likedAll } =
  storeToRefs(useSong);

function playFunc() {
  if (currentTrack.value) {
    useSong.playOrPauseThisSong(currentArtist.value, currentTrack.value);
    return;
  }
  useSong.playFromFirst();
}

function likeAlbum() {
  useSong.like();
}
</script>

<template>
  <div class="p-8">
    <TitleButton>{{ artist.name }}</TitleButton>

    <!-- Header of Album -->
    <div class="relative mt-3 flex h-full w-full items-center">
      <img :alt="artist.name" :src="artist.albumCover" width="140" />

      <div class="ml-5 w-full">
        <p
          class="absolute top-0 w-full cursor-pointer font-semibold text-white hover:underline"
          style="font-size: 33px"
          >{{ artist.name }}</p
        >

        <!-- Album Info -->
        <div class="flex text-[13px] text-gray-300">
          <p class="flex">Album</p>
          <div class="ml-2 flex">
            <div class="circle mr-2 mt-2" />
            <span class="-ml-0.5">{{ artist.releaseYear }}</span>
          </div>

          <div class="ml-2 flex">
            <div class="circle mr-2 mt-2" />
            <span class="-ml-0.5">{{ artist.tracks.length }} songs</span>
          </div>
        </div>

        <!-- Main Player and Album Like -->
        <div class="absolute bottom-0 mb-1.5 flex items-center gap-4">
          <button
            class="rounded-full bg-white p-1"
            type="button"
            @click="playFunc">
            <Play v-if="!isPlaying" :size="25" fill-color="#181818" />
            <Pause v-else :size="25" fill-color="#181818" />
          </button>

          <button type="button" @click="likeAlbum">
            <HeartOutline v-if="likedAll" :size="30" fill-color="#1bd760" />
            <Heart v-else :size="30" fill-color="#1bd760" />
          </button>
          <button type="button">
            <DotsHorizontal :size="25" fill-color="#fff" />
          </button>
        </div>
      </div>
    </div>

    <!-- Titles and Timelapse -->
    <div class="mt-6 flex items-center justify-between px-5 pt-2">
      <div class="flex items-center justify-between text-gray-400">
        <p class="mr-7">#</p>
        <p class="text-sm">Title</p>
      </div>

      <div>
        <ClockTimeThreeOutline :size="18" fill-color="#fff" />
      </div>
    </div>

    <div class="mb-4 mt-2 border-b border-b-[#2a2a2a]"></div>

    <!-- List of Musics -->
    <ul v-for="(track, index) in artist.tracks" :key="track.id" class="w-full">
      <SongRow :artist="artist" :index="++index" :track="track" />
    </ul>
  </div>
</template>

<style scoped>
.circle {
  width: 4px;
  height: 4px;
  background-color: rgb(189, 189, 189);
  border-radius: 100%;
}
</style>
