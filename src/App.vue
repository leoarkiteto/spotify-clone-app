<script lang="ts" setup>
import { ref } from "vue";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import ChevronUp from "vue-material-design-icons/ChevronUp.vue";

import MenuItem from "@/components/MenuItem.vue";

const openMenu = ref(false);
</script>

<template>
  <div>
    <div
      class="fixed right-0 z-20 flex h-[60px] w-[calc(100%-240px)] items-center justify-between bg-[#101010] bg-opacity-80"
    >
      <div class="ml-6 flex items-center">
        <button
          class="cursor-pointer rounded-full bg-black p-[1px]"
          type="button"
        >
          <ChevronLeft :size="30" fill-color="#fff" />
        </button>
        <button
          class="ml-4 cursor-pointer rounded-full bg-black p-[1px]"
          type="button"
        >
          <ChevronRight :size="30" fill-color="#fff" />
        </button>
      </div>

      <button
        :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
        class="mr-8 mt-0.5 cursor-pointer rounded-full bg-black p-0.5 hover:bg-[#282828]"
        type="button"
        @click="openMenu = !openMenu"
      >
        <span class="flex items-center">
          <img
            alt=""
            class="rounded-full"
            src="https://lh3.googleusercontent.com/a/AAcHTtdkGlqtHkdfvvuXXw8rw6Kaxw-nGZhYPcOAAVPGLnj_UcDu=s288-c-no"
            width="27"
          />
          <span class="ml-1.5 text-[14px] font-semibold text-white"
            >Leo Franca</span
          >
          <ChevronDown
            v-if="!openMenu"
            :size="25"
            fill-color="#fff"
            @click="openMenu = true"
          />
          <ChevronUp
            v-else
            :size="25"
            fill-color="#fff"
            @click="openMenu = false"
          />
        </span>
      </button>

      <span
        v-if="openMenu"
        class="fixed right-[35px] top-[52px] z-50 w-[190px] cursor-pointer rounded-sm bg-[#282828] p-1 shadow-2xl"
      >
        <ul class="text-[14px] font-semibold text-gray-200">
          <li class="border-b border-b-gray-600 px-3 py-2.5 hover:bg-[#3e3d3d]"
            >Profile</li
          >
          <li class="px-3 py-2.5 hover:bg-[#3e3d3d]">Profile</li>
        </ul>
      </span>
    </div>

    <div id="sideNav" class="fixed z-50 h-full w-[240px] bg-black p-6">
      <RouterLink to="/">
        <img
          alt="spotify logotype"
          src="/images/icons/spotify-logo.png"
          width="125"
        />
      </RouterLink>
      <div class="my-8"></div>

      <ul>
        <RouterLink :to="{ name: 'home' }">
          <MenuItem
            :icon-size="23"
            class="ml-[1px]"
            icon-string="home"
            name="Home"
            page-url="/"
          />
        </RouterLink>

        <RouterLink :to="{ name: 'search' }">
          <MenuItem
            :icon-size="24"
            class="ml-[1px]"
            icon-string="search"
            name="Search"
            page-url="/search"
          />
        </RouterLink>

        <RouterLink :to="{ name: 'library' }">
          <MenuItem
            :icon-size="23"
            class="ml-[2px]"
            icon-string="library"
            name="Library"
            page-url="/library"
          />
        </RouterLink>

        <div class="py-3.5"></div>

        <RouterLink :to="{ name: 'playlist' }">
          <MenuItem
            :icon-size="24"
            class="ml-[1px]"
            icon-string="playlist"
            name="Create Playlist"
            page-url="/playlist"
          />
        </RouterLink>

        <RouterLink :to="{ name: 'liked' }">
          <MenuItem
            :icon-size="27"
            class="ml-[1px]"
            icon-string="liked"
            name="Liked Songs"
            page-url="/liked"
          />
        </RouterLink>
      </ul>

      <div class="border-b border-b-gray-700"></div>

      <ul>
        <li
          class="mt-3 text-[13px] font-semibold text-gray-300 hover:text-white"
          >My Playlist #1</li
        >
        <li
          class="mt-3 text-[13px] font-semibold text-gray-300 hover:text-white"
          >My Playlist #2</li
        >
        <li
          class="mt-3 text-[13px] font-semibold text-gray-300 hover:text-white"
          >My Playlist #3</li
        >
        <li
          class="mt-3 text-[13px] font-semibold text-gray-300 hover:text-white"
          >My Playlist #4</li
        >
      </ul>
    </div>
  </div>

  <div
    class="fixed right-0 top-0 h-full w-[calc(100%-240px)] overflow-auto bg-gradient-to-b from-[#1c1c1c] to-black"
  >
    <div class="mt-[70px]"></div>
    <RouterView />
    <div class="mb-[100px]"></div>
  </div>
</template>
