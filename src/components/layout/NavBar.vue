<script lang="ts" setup>
import { ref } from "vue";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import ChevronUp from "vue-material-design-icons/ChevronUp.vue";

const openMenu = ref(false);
</script>

<template>
  <div
    class="fixed right-0 z-20 flex h-[60px] w-[calc(100%-240px)] items-center justify-between bg-[#101010] bg-opacity-80"
  >
    <!-- Button Navigation -->
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

    <!-- Avatar -->
    <button
      :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
      class="mr-8 mt-0.5 cursor-pointer rounded-full p-0.5 hover:bg-[#282828]"
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
        <ChevronDown v-if="!openMenu" :size="25" fill-color="#fff" />
        <ChevronUp v-else :size="25" fill-color="#fff" />
      </span>
    </button>

    <!-- Menu Dropdown -->
    <span
      v-if="openMenu"
      class="fixed right-[35px] top-[52px] z-50 w-[190px] cursor-pointer rounded-sm bg-[#282828] p-1 shadow-2xl"
    >
      <ul class="text-[14px] font-semibold text-gray-200">
        <li class="border-b border-b-gray-600 px-3 py-2.5 hover:bg-[#3e3d3d]"
          >Profile</li
        >
        <li class="px-3 py-2.5 hover:bg-[#3e3d3d]">Log out</li>
      </ul>
    </span>
  </div>
</template>
