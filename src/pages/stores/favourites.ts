import { defineStore } from "pinia";
import { PhotoDetails, UnsplashApi } from "../types";

export const useFavouritesStore = defineStore("favourites", {
  state: () => ({
    favourites: [] as unknown as (UnsplashApi & PhotoDetails)[],
  }),
  actions: {
    addFavourites(favourite: (UnsplashApi & PhotoDetails) | undefined) {
      if (!favourite) {
        return new Error("favourite is undefined");
      }
      if (this.favourites.some((item) => item.id === favourite.id)) {
        return;
      }
      this.favourites.push(favourite);
    },
  },
});
