import { defineStore } from "pinia";

import artistDB from "@/db/artist";

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

// eslint-disable-next-line import/prefer-default-export
export const useSongStore = defineStore("song", {
  state: () => ({
    isPlaying: false,
    audio: null as unknown as HTMLAudioElement,
    currentArtist: {} as Artist,
    currentTrack: {} as Track,
    likedAll: false,
  }),

  actions: {
    loadSong(artist: Artist, track: Track) {
      this.currentArtist = artist;
      this.currentTrack = track;

      if (this.audio && this.audio.src) {
        this.audio.pause();
        this.isPlaying = false;
        this.audio.src = "";
      }

      this.audio = new Audio();
      this.audio.src = track.path;

      setTimeout(() => {
        this.isPlaying = true;
        this.audio?.play();
      }, 200);
    },

    playOrPauseSong() {
      if (this.audio?.paused) {
        this.isPlaying = true;
        this.audio?.play();
      } else {
        this.isPlaying = false;
        this.audio?.pause();
      }
    },

    playOrPauseThisSong(artist: Artist, track: Track) {
      if (
        !this.audio ||
        !this.audio?.src ||
        this.currentTrack?.id !== track.id
      ) {
        this.loadSong(artist, track);
        return;
      }

      this.playOrPauseSong();
    },

    prevSong(currentTrack: Track) {
      const track = artistDB.tracks[currentTrack.id - 2];
      this.loadSong(artistDB, track);
    },

    nextSong(currentTrack: Track) {
      if (currentTrack.id === artistDB.tracks.length) {
        const track = artistDB.tracks[0];
        this.loadSong(artistDB, track);
      } else {
        const track = artistDB.tracks[currentTrack.id];
        this.loadSong(artistDB, track);
      }
    },

    playFromFirst() {
      this.resetState();
      const track = artistDB.tracks[0];
      this.loadSong(artistDB, track);
    },

    resetState() {
      this.isPlaying = false;
      this.audio = null as unknown as HTMLAudioElement;
      this.currentArtist = {} as Artist;
      this.currentTrack = {} as Track;
    },

    like() {
      this.likedAll = !this.likedAll;
    },
  },
  persist: true,
});
