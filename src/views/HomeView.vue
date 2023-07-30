<script lang="ts" setup>
import HomeCard from "@/components/HomeCard.vue";
import TitleButton from "@/components/TitleButton.vue";

import recommendation from "@/db/recommendation";
</script>

<template>
  <!-- Podcast -->
  <div class="p-8">
    <TitleButton>Podcasts to make you smarter</TitleButton>

    <div class="flex items-center">
      <HomeCard
        v-for="tip in recommendation.podcast"
        :key="tip.imageID"
        :image="`https://picsum.photos/id/${tip.imageID}/300/300`"
        :subtitle="tip.subtitle"
        :title="tip.title" />
    </div>
  </div>

  <!-- Radio Station -->
  <div class="p-8">
    <TitleButton>Radio Station</TitleButton>

    <div class="flex items-center">
      <HomeCard
        v-for="radio in recommendation.radio"
        :key="radio.imageID"
        :image="`https://picsum.photos/id/${radio.imageID}/300/300`"
        :subtitle="radio.subtitle"
        :title="radio.title" />
    </div>
  </div>

  <!-- Top Hits -->
  <div class="p-8">
    <TitleButton>Top Hits</TitleButton>

    <div class="flex items-center">
      <HomeCard
        v-for="song in recommendation.songs"
        :key="song.imageID"
        :image="`https://picsum.photos/id/${song.imageID}/300/300`"
        :subtitle="song.subtitle"
        :title="song.title" />
    </div>
  </div>
</template>
