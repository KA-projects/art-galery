<script setup lang="ts">
import Favourtires from "../../svg/Favourtires.vue";
</script>

<template>
  <div class="bg-black w-full h-[70px]">
    <div class="text-white px-[18px] py-5">
      <div class="flex justify-between items-center">
        <RouterLink to="/">
          <img src="../../../assets/logo.svg" alt="logo" />
        </RouterLink>

        <div><Favourtires /></div>
      </div>
    </div>
  </div>
</template>
