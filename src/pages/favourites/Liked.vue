<script lang="ts">
import { defineComponent } from "vue";
import { useFavouritesStore } from "../stores/favourites";

export default defineComponent({
  data() {
    return {
      favouritesStore: useFavouritesStore(),
    };
  },
});
</script>

<template>
  <div>
    <div class="hidden lg:block h-4 w-full bg-[#c4c4c4]"></div>

    <div class="w-full mt-10 lg:mt-[94px]">
      <h2 class="mx-auto font-bold text-4xl w-min lg:text-7xl">Favourites</h2>
    </div>

    <div class="mt-[56px] lg:mt-[101px]">
      <div class="px-5 max-w-container-sm lg:max-w-[1200px] mx-auto">
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-[30px]">
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
