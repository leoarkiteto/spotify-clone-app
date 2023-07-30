<script lang="ts" setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import MusicPlayer from "@/components/MusicPlayer.vue";
import NavBar from "@/components/layout/NavBar.vue";
import SidebarNav from "@/components/layout/SidebarNav.vue";

import { useSongStore } from "@/stores/song";

const useSong = useSongStore();
const { isPlaying, currentTrack } = storeToRefs(useSong);

onMounted(() => {
  isPlaying.value = false;
});
</script>

<template>
  <div>
    <!-- NavBar -->
    <NavBar />

    <!-- Sidebar Nav -->
    <SidebarNav />
  </div>

  <div
    class="fixed right-0 top-0 h-full w-[calc(100%-240px)] overflow-auto bg-gradient-to-b from-[#1c1c1c] to-black">
    <div class="mb-[100px] mt-[70px]">
      <RouterView />
    </div>
  </div>

  <MusicPlayer v-if="currentTrack" />
</template>
