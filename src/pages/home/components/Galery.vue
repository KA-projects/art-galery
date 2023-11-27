<script lang="ts">
import {defineComponent} from 'vue'
import type {  UnsplashApi } from "../../types";

export default defineComponent({
  data(): {
    photos: UnsplashApi[];
    term: string;
  } {
    return {
      photos: [],
      term: "",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const res = await fetch(
        "https://api.unsplash.com/photos/random?count=8",
        {
          method: "GET",

          headers: {
            "Accept-Version": "v1",
            Authorization: `Client-ID ${
              import.meta.env.VITE_UNSPLASH_ACCESS_KEY
            }`,
          },
        }
      );

      this.photos = await res.json();
    },
    async fetchPhotosBySearch(term: string) {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${term}`,
        {
          method: "GET",
          headers: {
            "Accept-Version": "v1",
            Authorization: `Client-ID ${
              import.meta.env.VITE_UNSPLASH_ACCESS_KEY
            }`,
          },
        }
      );

      const data = await res.json();

      this.photos = data.results;
    },
  },
}) ;
</script>

<template>
  <div class="background min-h-[230px] h-auto w-full">
    <form @submit.prevent="fetchPhotosBySearch(term)">
      <div
        class="relative px-5 flex items-center justify-center min-h-[230px] max-w-[886px] mx-auto lg:px-0"
      >
        <input
          v-model="term"
          class="bg-white h-[70px] text-2xl w-full outline-none px-6 py-5 pr-[60px] placeholder:text-black"
          type="text"
          placeholder="Search"
        />

        <button
          type="submit"
          class="absolute right-10 cursor-pointer lg:right-8"
        >
          <img src="../../../assets/search.svg" alt="search" />
        </button>
      </div>
    </form>
  </div>

  <div class="hidden lg:block h-4 w-full bg-[#c4c4c4]"></div>

  <div class="mt-[50px] lg:mt-[114px]">
    <div class="px-5 max-w-container-sm lg:max-w-[1200px] mx-auto">
      <div class="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-[30px]">
        <div v-for="photo in photos">
          <RouterLink :to="`/photo-details/${photo.id}`">
            <img
              class="rounded-lg object-cover max-w-full w-full h-[311px]"
              :src="photo.urls.small"
              alt="one"
            />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
