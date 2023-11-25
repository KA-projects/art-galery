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

const data = ref<UnsplashApi[]>([]);

const fetchData = async () => {
  const res = await fetch("https://api.unsplash.com/photos/random?count=8", {
    method: "GET",

    headers: {
      "Accept-Version": "v1",
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
    },
  });

  data.value = await res.json();
  console.log(data.value);
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="mt-[50px]">
    <div class="px-5">
      <div class="grid grid-cols-1 gap-5">
        <RouterLink v-for="photo in data" to="/photo-details">
          <img
            class="rounded-lg object-cover max-w-full w-full h-[311px]"
            :src="photo.urls.small"
            alt="one"
          />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
