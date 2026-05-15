<template>
  <div class="scene-art" :class="locationClass">
    <div class="scene-bg"></div>
    <div class="scene-overlay"></div>
    <div class="scene-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  location: {
    type: String,
    default: 'casa',
  },
})

const locationClass = computed(() => `scene-${props.location}`)
</script>

<style scoped>
.scene-art {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scene-bg {
  position: absolute;
  inset: 0;
  transition: opacity 0.5s;
}

.scene-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.5) 100%);
  pointer-events: none;
  z-index: 1;
}

.scene-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
}

.scene-casa .scene-bg {
  background:
    radial-gradient(ellipse at 30% 20%, rgba(255, 200, 100, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(100, 150, 255, 0.05) 0%, transparent 40%),
    linear-gradient(180deg, #0d0d1a 0%, #1a1a2e 30%, #16213e 70%, #0a1628 100%);
}

.scene-casa .scene-bg::before {
  content: '';
  position: absolute;
  top: 15%;
  left: 10%;
  width: 60%;
  height: 50%;
  background:
    linear-gradient(90deg, transparent 48%, rgba(255,255,255,0.03) 48%, rgba(255,255,255,0.03) 52%, transparent 52%),
    linear-gradient(0deg, transparent 48%, rgba(255,255,255,0.03) 48%, rgba(255,255,255,0.03) 52%, transparent 52%);
  background-size: 20% 25%;
}

.scene-casa .scene-bg::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 15%;
  background: linear-gradient(0deg, rgba(40, 30, 20, 0.3) 0%, transparent 100%);
}

.scene-calle .scene-bg {
  background:
    radial-gradient(ellipse at 50% 10%, rgba(200, 150, 100, 0.08) 0%, transparent 40%),
    linear-gradient(180deg, #1a0d0d 0%, #2d1b1b 30%, #1a1a1a 60%, #0d0d0d 100%);
}

.scene-calle .scene-bg::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background:
    repeating-linear-gradient(90deg, #2a2a2a 0px, #2a2a2a 30px, #1a1a1a 30px, #1a1a1a 60px),
    linear-gradient(0deg, #333 0%, transparent 100%);
  opacity: 0.4;
}

.scene-calle .scene-bg::after {
  content: '';
  position: absolute;
  top: 20%;
  right: 15%;
  width: 40px;
  height: 100px;
  background: linear-gradient(180deg, transparent 0%, rgba(200, 180, 100, 0.15) 100%);
  clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
}

.scene-supermercado .scene-bg {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(255, 255, 150, 0.06) 0%, transparent 40%),
    radial-gradient(ellipse at 80% 30%, rgba(255, 150, 150, 0.04) 0%, transparent 30%),
    linear-gradient(180deg, #1a1a0d 0%, #2d2d1b 40%, #1a1a1a 70%, #0d0d0d 100%);
}

.scene-supermercado .scene-bg::before {
  content: '';
  position: absolute;
  top: 25%;
  left: 10%;
  right: 10%;
  height: 50%;
  background:
    repeating-linear-gradient(0deg, rgba(100,100,80,0.1) 0px, rgba(100,100,80,0.1) 15px, transparent 15px, transparent 16px),
    repeating-linear-gradient(90deg, rgba(80,80,60,0.1) 0px, rgba(80,80,60,0.1) 25px, transparent 25px, transparent 26px);
}

.scene-farmacia .scene-bg {
  background:
    radial-gradient(ellipse at 50% 40%, rgba(150, 255, 200, 0.06) 0%, transparent 40%),
    linear-gradient(180deg, #0d1a1a 0%, #1b2d2d 40%, #1a2a1a 70%, #0d0d0d 100%);
}

.scene-farmacia .scene-bg::before {
  content: '';
  position: absolute;
  top: 10%;
  right: 15%;
  width: 50px;
  height: 50px;
  border: 2px solid rgba(150, 255, 200, 0.15);
  background: rgba(150, 255, 200, 0.03);
}

.scene-farmacia .scene-bg::after {
  content: '+';
  position: absolute;
  top: 18%;
  right: 22%;
  font-family: 'Press Start 2P', monospace;
  font-size: 24px;
  color: rgba(150, 255, 200, 0.15);
}

.scene-refugio .scene-bg {
  background:
    radial-gradient(ellipse at 50% 50%, rgba(150, 200, 150, 0.08) 0%, transparent 40%),
    linear-gradient(180deg, #0d1a0d 0%, #1b2d1b 40%, #1a1a1a 70%, #0d0d0d 100%);
}

.scene-rescate .scene-bg {
  background:
    radial-gradient(ellipse at 50% 20%, rgba(100, 200, 255, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 30% 30%, rgba(255, 255, 200, 0.08) 0%, transparent 30%),
    linear-gradient(180deg, #1a3a5e 0%, #2a5a8e 30%, #4a8abe 60%, #1a3a5e 100%);
  animation: sunrise 4s ease;
}

@keyframes sunrise {
  from { filter: brightness(0.4) saturate(0.5); }
  to { filter: brightness(1) saturate(1); }
}

.scene-rescate .scene-bg::before {
  content: '';
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 30px;
  background: rgba(100, 200, 255, 0.3);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(100, 200, 255, 0.5);
  animation: helicopter 3s ease-in-out infinite;
}

@keyframes helicopter {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-8px); }
}

@media (max-width: 768px) {
  .scene-farmacia .scene-bg::before {
    width: 35px;
    height: 35px;
  }
  .scene-farmacia .scene-bg::after {
    font-size: 16px;
  }
  .scene-rescate .scene-bg::before {
    width: 60px;
    height: 22px;
  }
}
</style>