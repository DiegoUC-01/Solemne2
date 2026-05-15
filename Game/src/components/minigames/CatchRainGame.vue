<template>
  <div class="minigame-container">
    <h2 class="minigame-title">💧 RECOGER AGUA DE LLUVIA</h2>
    
    <div class="game-area">
      <div 
        v-for="(drop, idx) in raindrops" 
        :key="idx"
        class="raindrop"
        :style="{ 
          left: drop.x + '%',
          top: drop.y + '%'
        }"
      >
        💧
      </div>

      <div class="bucket" :style="{ left: bucketX + '%' }">
        🪣
      </div>

      <div class="water-level" :style="{ height: (waterCollected / maxWater) * 100 + '%' }"></div>

      <div v-if="timeLeft <= 0" class="game-over">
        <h3>{{ waterCollected >= maxWater / 2 ? '¡EXCELENTE!' : '¡INSUFICIENTE!' }}</h3>
        <p>Agua recolectada: {{ waterCollected }}/{{ maxWater }}</p>
      </div>

      <div class="game-stats">
        <span>Tiempo: {{ Math.ceil(timeLeft) }}s</span>
        <span>Agua: {{ waterCollected }}/{{ maxWater }}</span>
      </div>
    </div>

    <div class="instructions">
      Usa IZQUIERDA/DERECHA o A/D para mover el cubo. Recoge tanta agua como puedas en 25 segundos.
    </div>

    <button 
      v-if="timeLeft <= 0"
      class="continue-btn"
      @click="emitResult"
    >
      Continuar
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['complete'])

const bucketX = ref(50)
const raindrops = ref([])
const waterCollected = ref(0)
const maxWater = ref(15)
const timeLeft = ref(25)
const gameActive = ref(true)

const generateRain = () => {
  setInterval(() => {
    if (gameActive.value && timeLeft.value > 0) {
      raindrops.value.push({
        x: Math.random() * 90,
        y: -5,
        id: Math.random()
      })
    }
  }, 200)
}

const updateRain = () => {
  raindrops.value = raindrops.value.filter(drop => {
    drop.y += 2

    // Detectar colisión con el cubo
    if (drop.y > 85 && drop.y < 95) {
      const distance = Math.abs(bucketX.value - drop.x)
      if (distance < 5) {
        waterCollected.value++
        return false
      }
    }

    return drop.y < 100
  })
}

const emitResult = () => {
  emit('complete', waterCollected.value >= maxWater.value / 2 ? 'win' : 'lose')
}

const handleKeyPress = (e) => {
  if (!gameActive.value) return
  
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    bucketX.value = Math.max(0, bucketX.value - 5)
  } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    bucketX.value = Math.min(95, bucketX.value + 5)
  }
}

const updateTimer = () => {
  if (timeLeft.value > 0) {
    timeLeft.value -= 0.1
    updateRain()
  } else {
    gameActive.value = false
  }
}

onMounted(() => {
  generateRain()
  window.addEventListener('keydown', handleKeyPress)
  const interval = setInterval(updateTimer, 100)
  
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyPress)
    clearInterval(interval)
  })
})
</script>

<style scoped>
.minigame-container {
  background: #111;
  border: 3px solid #fff;
  padding: 1.5rem;
  font-family: 'Courier New', monospace;
}

.minigame-title {
  color: #00ccff;
  text-align: center;
  text-shadow: 2px 2px 0 #0088ff;
  margin-bottom: 1rem;
}

.game-area {
  position: relative;
  width: 100%;
  height: 350px;
  background: linear-gradient(180deg, #003366 0%, #001144 100%);
  border: 2px solid #00ffff;
  overflow: hidden;
  margin-bottom: 1rem;
}

.raindrop {
  position: absolute;
  font-size: 1.2rem;
  animation: fall linear forwards;
}

@keyframes fall {
  to {
    transform: translateY(400px);
  }
}

.bucket {
  position: absolute;
  bottom: 10px;
  font-size: 2rem;
  transition: left 0.1s;
  animation: wobble 0.5s infinite;
}

@keyframes wobble {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-2deg); }
  75% { transform: rotate(2deg); }
}

.water-level {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, #0099ff, #0066ff);
  opacity: 0.3;
  transition: height 0.1s;
}

.game-stats {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #00ffff;
  font-weight: bold;
  display: flex;
  gap: 1rem;
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.9);
  padding: 2rem;
  text-align: center;
  border: 2px solid #00ccff;
  color: #00ccff;
}

.game-over h3 {
  font-size: 2rem;
  margin: 0;
}

.instructions {
  color: #00ffff;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.continue-btn {
  padding: 0.8rem 2rem;
  background: #00ffff;
  color: #000;
  border: 2px solid #00ffff;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.continue-btn:hover {
  background: #000;
  color: #00ffff;
}
</style>