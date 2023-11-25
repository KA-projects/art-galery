import { defineStore } from "pinia";
import { PhotoDetails, UnsplashApi } from "../types";

export const useFavouritesStore = defineStore("favourites", {
  state: () => ({
    favourites: [] as unknown as (UnsplashApi & PhotoDetails)[],
  }),
  actions: {
    addFavourites(favourite: UnsplashApi & PhotoDetails) {
      this.favourites.push(favourite);
    },
  },
});
