<template>
  <div class="pixel-background"></div>
</template>

<style scoped>
.pixel-background {
  position: absolute;
  inset: 0;

  background-image:
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)),
    url('https://images.unsplash.com/photo-1520034475321-cbe63696469a?q=80&w=1974&auto=format&fit=crop');

  background-size: cover;
  background-position: center;

  image-rendering: pixelated;

  animation: zoomBg 20s infinite alternate;

  z-index: 1;
}

@keyframes zoomBg {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.1);
  }
}
</style>