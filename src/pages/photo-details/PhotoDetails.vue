<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { PhotoDetails, UnsplashApi } from "../types";
import { useFavouritesStore } from "../stores/favourites";

onMounted(() => {
  fetchPhotoById(photoId);
});

const route = useRoute();
const photoId = route.params.id as string;

const photo = ref<UnsplashApi & PhotoDetails>({
  id: "",
  urls: {
    raw: "",
    regular: "",
    full: "",
    small: "",
    thumb: "",
  },
  user: {
    name: "",
    username: "",
    profile_image: {
      medium: "",
    },
  },
});

const fetchPhotoById = async (id: string) => {
  const res = await fetch(`https://api.unsplash.com/photos/${id}`, {
    method: "GET",
    headers: {
      "Accept-Version": "v1",
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
    },
  });
  const data = await res.json();

  photo.value = data;
};

const favouritesStore = useFavouritesStore();

const addFavourite = () => {
  favouritesStore.addFavourites(photo.value);
};
</script>

<template>
  <div class="mt-10">
    <div class="px-5">
      <div class="flex justify-between">
        <div class="flex items-center">
          <div>
            <img
              :src="photo.user.profile_image.medium"
              class="w-[48px] h-[48px] rounded-lg object-cover"
              alt="user"
            />
          </div>
          <div class="ml-3">
            <div class="leading-none">{{ photo.user.name }}</div>
            <div class="leading-none text-gray-500">
              {{ photo.user.username }}
            </div>
          </div>
        </div>
        <div class="flex gap-4">
          <button @click="addFavourite">
            <img src="../../assets/favourite.svg" alt="favourite" />
          </button>
          <img src="../../assets/download.svg" alt="favourite" />
        </div>
      </div>
    </div>
  </div>

  <div class="mt-8">
    <div class="px-5">
      <img
        :src="photo.urls.small"
        alt="photo"
        class="rounded-lg min-h-[227px] object-cover max-w-full w-full"
      />
    </div>
  </div>
</template>
