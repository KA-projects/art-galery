<script setup lang="ts">
import FavourtiresSVG from "../../svg/FavourtiresSVG.vue";
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

        <RouterLink to="/favourites">
          <div class="flex items-center gap-[10px]">
            <FavourtiresSVG />
            <span class="hidden lg:inline text-xl">Favourites</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
