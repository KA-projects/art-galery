<script setup lang="ts">
import FavourtiresSVG from "../../svg/FavourtiresSVG.vue";
import SearchSVG from "../../svg/SearchSVG.vue";

import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { UnsplashApi } from "../../types";

const route = useRoute();
const showSearch = ref(false);
const term = ref<string>("");
const photos = ref<UnsplashApi[]>([]);

watch(
  () => route.path,
  (newPath) => {
    if (newPath === "/") {
      showSearch.value = false;
    } else {
      showSearch.value = true;
    }
  }
);

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
  <div class="bg-black w-full h-[70px] lg:h-[148px]">
    <div
      class="text-white px-[18px] py-5 max-w-container-xl mx-auto h-full lg:py-[32px]"
    >
      <div class="flex justify-between items-center">
        <RouterLink to="/">
          <img
            src="../../../assets/logo.svg"
            class="lg:w-[185px] lg:h-[72px]"
            alt="logo"
          />
        </RouterLink>

        <div class="flex items-center gap-10">
          <button v-if="showSearch" class="flex items-center gap-[10px]">
            <SearchSVG />

            <v-dialog width="80vw">
              <template v-slot:activator="{ props }">
                <span v-bind="props" class="hidden lg:inline text-xl"
                  >Search</span
                >
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Search photos">
                  <form @submit.prevent="fetchPhotosBySearch(term)">
                    <div
                      class="relative px-5 flex justify-center max-w-[500px] mx-auto w-full lg:px-0"
                    >
                      <input
                        v-model="term"
                        class="bg-black text-white text-2xl h-[70px] w-full outline-none pl-6 py-5 pr-[60px] placeholder:text-white"
                        type="text"
                        placeholder="Search"
                      />

                      <button
                        type="submit"
                        class="absolute right-10 top-6 cursor-pointer"
                      >
                        <SearchSVG />
                      </button>
                    </div>
                  </form>

                  <div class="mt-[50px]">
                    <div
                      class="px-5 max-w-container-sm lg:max-w-[1200px] mx-auto"
                    >
                      <div
                        class="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-[30px]"
                      >
                        <div
                          @click="isActive.value = false"
                          v-for="photo in photos"
                        >
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

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text="Close" @click="isActive.value = false"></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </button>

          <RouterLink to="/favourites">
            <div class="flex items-center gap-[10px]">
              <FavourtiresSVG />
              <span class="hidden lg:inline text-xl">Favourites</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
