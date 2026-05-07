<script setup>
import StatBar from '@/components/StatBar.vue'
import PixelBackground from '@/components/PixelBackground.vue'
</script>

<template>
  <div class="game-wrapper crt-screen">

    <PixelBackground />

    <div class="game-container">
      <StatBar />

      <router-view />
    </div>

  </div>
</template>

<style scoped>
.game-wrapper {
  width: 100vw;
  height: 100vh;

  overflow: hidden;
  background: black;

  position: relative;
}

.game-container {
  position: relative;
  z-index: 2;

  width: 100%;
  height: 100%;

  aspect-ratio: 16 / 9;

  display: flex;
  flex-direction: column;
}
</style>