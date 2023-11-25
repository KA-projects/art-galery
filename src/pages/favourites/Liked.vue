<script setup lang="ts">
import { useFavouritesStore } from "../stores/favourites";

const favouritesStore = useFavouritesStore();
</script>

<template>
  <div>
    <div class="w-full">
      <h2 class="mx-auto mt-10 font-bold text-4xl w-min">Favourites</h2>
    </div>

    <div class="mt-[56px]">
      <div class="px-5">
        <div class="grid grid-cols-1 gap-5">
          <div v-for="photo in favouritesStore.favourites">
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
  </div>
</template>
