<script setup lang="ts">
import FavourtiresSVG from "../../svg/FavourtiresSVG.vue";
</script>

<template>
  <div class="bg-black w-full h-[70px]">
    <div class="text-white px-[18px] py-5">
      <div class="flex justify-between items-center">
        <RouterLink to="/">
          <img src="../../../assets/logo.svg" alt="logo" />
        </RouterLink>

        <RouterLink to="/favourites">
          <div><FavourtiresSVG /></div
        ></RouterLink>
      </div>
    </div>
  </div>
</template>
