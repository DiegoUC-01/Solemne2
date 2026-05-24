<template>
  <div class="minigame-container">
    <h2 class="minigame-title">⭕ EVITAR ASALTANTES</h2>

    <div class="game-area">
      <div class="player" :style="{ left: playerX + '%' }"></div>

      <div
        v-for="item in items"
        :key="item.id"
        class="item"
        :style="{
          left: item.x + '%',
          top: item.y + '%',
          background: item.color,
        }"
      >
        {{ item.emoji }}
      </div>

      <div v-if="timeLeft <= 0 || collected >= targetCans" class="game-over">
        <h3>{{ collected >= targetCans ? '¡VICTORIA!' : '¡DERROTA!' }}</h3>
        <p>Latas recolectadas: {{ collected }}/{{ targetCans }}</p>
      </div>

      <div class="game-stats">
        <span>Tiempo: {{ Math.ceil(timeLeft) }}s</span>
        <span>Recogidas: {{ collected }}/{{ targetCans }}</span>
      </div>
    </div>

    <div class="instructions">
      Usa ← → o A/D para moverte. Recoge {{ targetCans }} latas en 30 segundos.
    </div>

    <button
      v-if="timeLeft <= 0 || collected >= targetCans"
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

const playerX = ref(50)
const items = ref([])
const collected = ref(0)
const targetCans = 5
const timeLeft = ref(30)
const gameActive = ref(true)
let gameInterval = null

const generateItems = () => {
  items.value = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    x: Math.random() * 88 + 2,
    y: Math.random() * 75 + 5,
    color: ['#ff00ff', '#00ffff', '#ffff00', '#ff0088'][Math.floor(Math.random() * 4)],
    emoji: '🥫',
  }))
}

const checkWin = () => {
  if (collected.value >= targetCans) {
    gameActive.value = false
    clearInterval(gameInterval)
  }
}

const emitResult = () => {
  emit('complete', collected.value >= targetCans ? 'win' : 'lose')
}

const handleKeyPress = (e) => {
  if (!gameActive.value) return

  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    playerX.value = Math.max(2, playerX.value - 6)
  } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    playerX.value = Math.min(94, playerX.value + 6)
  }

  const playerCenter = playerX.value
  items.value = items.value.filter((item) => {
    const distance = Math.abs(playerCenter - item.x)
    if (distance < 7) {
      collected.value++
      checkWin()
      return false
    }
    return true
  })
}

const updateTimer = () => {
  if (timeLeft.value > 0) {
    timeLeft.value -= 0.1
  } else {
    gameActive.value = false
  }
}

onMounted(() => {
  generateItems()
  window.addEventListener('keydown', handleKeyPress)
  gameInterval = setInterval(updateTimer, 100)
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyPress)
    clearInterval(gameInterval)
  })
})
</script>

<style scoped>
.minigame-container {
  background: #111;
  border: 3px solid #00ff00;
  padding: 1.5rem;
  font-family: 'Courier New', monospace;
  max-width: 700px;
  margin: 0 auto;
}

.minigame-title {
  color: #ffff00;
  text-align: center;
  text-shadow: 0 0 10px #ff8800;
  margin-bottom: 1rem;
}

.game-area {
  position: relative;
  width: 100%;
  height: 340px;
  background: linear-gradient(180deg, #1a0a2e 0%, #2d1040 60%, #0a0a0a 100%);
  border: 2px solid #00ff00;
  overflow: hidden;
  margin-bottom: 1rem;
}

.player {
  position: absolute;
  bottom: 12px;
  width: 32px;
  height: 32px;
  background: #00ff66;
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  transition: left 0.08s;
  filter: drop-shadow(0 0 6px #00ff66);
  z-index: 10;
}

.item {
  position: absolute;
  width: 34px;
  height: 34px;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  animation: float 2s ease-in-out infinite;
  filter: drop-shadow(0 0 6px currentColor);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.game-stats {
  position: absolute;
  top: 10px;
  right: 12px;
  color: #00ff66;
  font-weight: bold;
  display: flex;
  gap: 1rem;
  font-size: 0.95rem;
  z-index: 5;
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.92);
  padding: 2rem;
  text-align: center;
  border: 2px solid #ffff00;
  color: #ffff00;
  z-index: 20;
}

.game-over h3 {
  font-size: 2rem;
  margin: 0;
  text-shadow: 0 0 10px rgba(255, 255, 0, 0.7);
}

.game-over p {
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.instructions {
  color: #88ff88;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
}

.continue-btn {
  display: block;
  margin: 0 auto;
  padding: 0.8rem 2rem;
  background: #00ff66;
  color: #000;
  border: 2px solid #00ff66;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.continue-btn:hover {
  background: #000;
  color: #00ff66;
}
</style>
