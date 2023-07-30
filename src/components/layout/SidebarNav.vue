<script lang="ts" setup>
import MenuItem from "@/components/MenuItem.vue";
import PlaylistItem from "@/components/PlaylistItem.vue";

import playlist from "@/db/playlist";
</script>

<template>
  <div
    id="sideNav"
    class="fixed z-50 h-full w-[240px] divide-y divide-solid divide-gray-700 bg-black p-6">
    <!-- Logo -->
    <RouterLink :to="{ name: 'home' }">
      <img
        alt="spotify logotype"
        src="/images/icons/spotify-logo.png"
        width="125" />
    </RouterLink>

    <!-- Icon Links -->
    <ul class="mt-4 pt-4">
      <RouterLink :to="{ name: 'home' }">
        <MenuItem
          :icon-size="23"
          class="ml-[1px]"
          icon-string="home"
          name="Home"
          page-url="/" />
      </RouterLink>

      <RouterLink :to="{ name: 'search' }">
        <MenuItem
          :icon-size="24"
          class="ml-[1px]"
          icon-string="search"
          name="Search"
          page-url="/search" />
      </RouterLink>

      <RouterLink :to="{ name: 'library' }">
        <MenuItem
          :icon-size="23"
          class="ml-[2px]"
          icon-string="library"
          name="Library"
          page-url="/library" />
      </RouterLink>

      <div class="py-3.5" />

      <RouterLink :to="{ name: 'home' }">
        <MenuItem
          :icon-size="24"
          class="ml-[1px]"
          icon-string="playlist"
          name="Create Playlist"
          page-url="/playlist" />
      </RouterLink>

      <RouterLink :to="{ name: 'home' }">
        <MenuItem
          :icon-size="27"
          class="ml-[1px]"
          icon-string="liked"
          name="Liked Songs"
          page-url="/liked" />
      </RouterLink>
    </ul>

    <!-- Playlist -->
    <ul class="h-[570px] overflow-x-scroll">
      <li
        v-for="item in playlist"
        :key="item.imageID"
        class="mt-3 text-[13px] font-semibold text-gray-300 hover:text-white"
        ><PlaylistItem
          :category="item.category"
          :image-id="item.imageID"
          :playlist="item.playlist"
          :title="item.title"
      /></li>
    </ul>
  </div>
</template>
