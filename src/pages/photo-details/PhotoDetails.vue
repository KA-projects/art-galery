<script lang="ts">

import { defineComponent } from "vue";
import { PhotoDetails, UnsplashApi } from "../types";
import { useFavouritesStore } from "../stores/favourites";

export default defineComponent({
  data(): {
    photo: (UnsplashApi & PhotoDetails) | undefined;
    isOpenSnackbar: boolean;
    photoId: string | string[];
    favouritesStore: ReturnType<typeof useFavouritesStore>;
  } {
    return {
      photo: undefined,
      isOpenSnackbar: false,
      photoId: this.$route.params.id,
      favouritesStore: useFavouritesStore(),
    };
  },
  mounted() {
    this.fetchPhotoById(this.photoId as string);

    this.$watch(
      () => this.$route.params.id,
      (newId) => {
        this.fetchPhotoById(newId as string);
      }
    );
  },
  methods: {
    async fetchPhotoById(id: string) {
      const res = await fetch(`https://api.unsplash.com/photos/${id}`, {
        method: "GET",
        headers: {
          "Accept-Version": "v1",
          Authorization: `Client-ID ${
            import.meta.env.VITE_UNSPLASH_ACCESS_KEY
          }`,
        },
      });
      const data = await res.json();

      this.photo = data;
    },

    addFavourite() {
      this.favouritesStore.addFavourites(this.photo);
      this.isOpenSnackbar = true;
    },
  },
});
</script>

<template>
  <div class="mt-10" v-if="photo">
    <v-snackbar v-model="isOpenSnackbar" :timeout="2000">
      <span class="text-lg">Added to favourites</span>

      <template v-slot:actions>
        <v-btn color="yellow" variant="text" @click="isOpenSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <div class="px-5 max-w-container-xl mx-auto w-full">
      <div class="flex justify-between">
        <div class="flex items-center">
          <div>
            <img
              :src="photo.user.profile_image.medium"
              class="w-[48px] h-[48px] rounded-lg object-cover lg:w-[55px] lg:h-[55px]"
              alt="user"
            />
          </div>
          <div class="ml-3">
            <div class="leading-none text-lg lg:text-[32px]">
              {{ photo.user.name }}
            </div>
            <div class="leading-none text-gray-500 text-sm lg:text-lg">
              {{ photo.user.username }}
            </div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button class="w-[49px] h-[49px] flex-none" @click="addFavourite">
            <img src="../../assets/favourite.svg" alt="favourite" />
          </button>
          <img
            class="lg:hidden"
            src="../../assets/download.svg"
            alt="favourite"
          />
          <div
            class="hidden lg:flex lg:items-center lg:justify-center lg:rounded-lg bg-[#FFF200] w-[206px] h-[49px] px-6"
          >
            <div>
              <img
                class=""
                src="../../assets/download-mini.svg"
                alt="favourite"
              />
            </div>

            <span class="text-lg ml-4">Download</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-8" v-if="photo">
    <div class="px-5 max-w-container-xl mx-auto">
      <img
        :src="photo.urls.full"
        alt="photo"
        class="rounded-lg min-h-[227px] max-h-[744px] object-cover max-w-full w-full"
      />
    </div>
  </div>

  <div v-else class="text-center text-2xl font-medium">Loading...</div>
</template>
