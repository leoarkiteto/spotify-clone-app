<script lang="ts" setup>
import { ref } from "vue";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import ChevronUp from "vue-material-design-icons/ChevronUp.vue";

const openMenu = ref(false);
</script>

<template>
  <div>
    <div
      class="w-[calc(100%-240px)] h-[60px] fixed right-0 z-20 bg-[#101010] bg-opacity-80 flex items-center justify-between"
    >
      <div class="flex items-center ml-6">
        <button
          class="rounded-full bg-black p-[1px] cursor-pointer"
          type="button"
        >
          <ChevronLeft :size="30" fill-color="#fff" />
        </button>
        <button
          class="rounded-full bg-black p-[1px] ml-4 cursor-pointer"
          type="button"
        >
          <ChevronRight :size="30" fill-color="#fff" />
        </button>
      </div>

      <button
        :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
        class="bg-black hover:bg-[#282828] rounded-full p-0.5 mr-8 mt-0.5 cursor-pointer"
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
          <span class="text-white text-[14px] ml-1.5 font-semibold"
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
        class="cursor-pointer p-1 right-[35px] top-[52px] rounded-sm fixed w-[190px] bg-[#282828] shadow-2xl z-50"
      >
        <ul class="text-gray-200 font-semibold text-[14px]">
          <li class="px-3 py-2.5 hover:bg-[#3e3d3d] border-b border-b-gray-600"
            >Profile</li
          >
          <li class="px-3 py-2.5 hover:bg-[#3e3d3d]">Profile</li>
        </ul>
      </span>
    </div>
  </div>
</template>
