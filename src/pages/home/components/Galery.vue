<script setup lang="ts">
import { ref, onMounted } from "vue";

type UnsplashApi = {
  urls: {
    raw: string;
    regular: string;
    full: string;
    small: string;
    thumb: string;
  };
};

const photos = ref<UnsplashApi[]>([]);
const term = ref<string>("");

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  const res = await fetch("https://api.unsplash.com/photos/random?count=8", {
    method: "GET",

    headers: {
      "Accept-Version": "v1",
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
    },
  });

  photos.value = await res.json();
};

const fetchPhotosBySearch = async (term: string) => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${term}`,
    {
      method: "GET",
      headers: {
        "Accept-Version": "v1",
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  const data = await res.json();

  photos.value = data.results;
};
</script>

<template>
  <div class="background min-h-[230px] h-auto w-full">
    <div class="relative px-5 flex items-center justify-center min-h-[230px]">
      <input
        v-model="term"
        class="bg-white h-[70px] w-full outline-none px-6 py-5 pr-[60px] placeholder:text-black"
        type="text"
        placeholder="Search"
      />

      <img
        @click="fetchPhotosBySearch(term)"
        class="absolute right-10 cursor-pointer"
        src="../../../assets/search.svg"
        alt="search"
      />
    </div>
  </div>

  <div class="mt-[50px]">
    <div class="px-5">
      <div class="grid grid-cols-1 gap-5">
        <div v-for="photo in photos">
          <RouterLink to="/photo-details">
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
