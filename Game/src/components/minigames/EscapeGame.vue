<template>
  <div class="minigame-container">
    <h2 class="minigame-title">🚁 ESCAPE FINAL</h2>

    <div class="game-area">
      <div class="helicopter">🚁</div>

      <div
        class="player"
        :style="{ left: playerX + '%', bottom: playerY + '%' }"
      ></div>

      <div
        v-for="bomb in bombs"
        :key="bomb.id"
        class="bomb"
        :style="{
          left: bomb.x + '%',
          top: bomb.y + '%',
        }"
      >
        💣
      </div>

      <div v-if="timeLeft <= 0 || escaped || health <= 0" class="game-over">
        <h3 v-if="escaped">¡RESCATADO!</h3>
        <h3 v-else-if="health <= 0">¡DERRIBADO!</h3>
        <h3 v-else>¡SE ACABÓ EL TIEMPO!</h3>
        <p v-if="escaped">Alcanzaste el helicóptero</p>
        <p v-else-if="health <= 0">Las bombas te alcanzaron</p>
        <p v-else>No llegaste a tiempo</p>
      </div>

      <div class="game-stats">
        <span>Tiempo: {{ Math.ceil(timeLeft) }}s</span>
        <span>Vida: {{ health }}/100</span>
      </div>
    </div>

    <div class="instructions">
      Usa ← → ↑ ↓ o WASD. Esquiva bombas y llega al helicóptero en 20 segundos.
    </div>

    <button
      v-if="timeLeft <= 0 || escaped || health <= 0"
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
const playerY = ref(5)
const bombs = ref([])
const escaped = ref(false)
const health = ref(100)
const timeLeft = ref(20)
const gameActive = ref(true)
let bombId = 0
let bombInterval = null
let gameInterval = null

const checkGameOver = () => {
  if (health.value <= 0 || escaped.value) {
    gameActive.value = false
    clearInterval(bombInterval)
    clearInterval(gameInterval)
  }
}

const spawnBomb = () => {
  if (gameActive.value && timeLeft.value > 0) {
    bombs.value.push({
      x: Math.random() * 88 + 2,
      y: -3,
      speed: 1 + Math.random() * 2,
      id: ++bombId,
    })
  }
}

const updateBombs = () => {
  bombs.value = bombs.value.filter((bomb) => {
    bomb.y += bomb.speed

    if (bomb.y > playerY.value - 6 && bomb.y < playerY.value + 6) {
      const distance = Math.abs(playerX.value - bomb.x)
      if (distance < 8) {
        health.value = Math.max(0, health.value - 20)
        checkGameOver()
      }
    }

    return bomb.y < 100
  })

  if (playerY.value > 88 && playerX.value > 42 && playerX.value < 58) {
    escaped.value = true
    gameActive.value = false
    clearInterval(bombInterval)
    clearInterval(gameInterval)
  }
}

const emitResult = () => {
  emit('complete', escaped.value ? 'win' : 'lose')
}

const handleKeyPress = (e) => {
  if (!gameActive.value) return

  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    playerX.value = Math.max(2, playerX.value - 4)
  } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    playerX.value = Math.min(94, playerX.value + 4)
  } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
    playerY.value = Math.min(90, playerY.value + 4)
  } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
    playerY.value = Math.max(0, playerY.value - 4)
  }
}

const updateTimer = () => {
  if (timeLeft.value > 0) {
    timeLeft.value -= 0.1
    updateBombs()
  } else {
    gameActive.value = false
    clearInterval(bombInterval)
  }
}

onMounted(() => {
  bombInterval = setInterval(spawnBomb, 350)
  gameInterval = setInterval(updateTimer, 100)
  window.addEventListener('keydown', handleKeyPress)

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyPress)
    clearInterval(bombInterval)
    clearInterval(gameInterval)
  })
})
</script>

<style scoped>
.minigame-container {
  background: #111;
  border: 3px solid #ff6600;
  padding: 1.5rem;
  font-family: 'Courier New', monospace;
  max-width: 700px;
  margin: 0 auto;
}

.minigame-title {
  color: #ff6600;
  text-align: center;
  text-shadow: 0 0 10px #ff4400;
  margin-bottom: 1rem;
}

.game-area {
  position: relative;
  width: 100%;
  height: 420px;
  background: linear-gradient(180deg, #1a0030 0%, #330020 60%, #0a0a0a 100%);
  border: 2px solid #ff6600;
  overflow: hidden;
  margin-bottom: 1rem;
}

.helicopter {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3.2rem;
  filter: drop-shadow(0 0 12px rgba(255, 200, 0, 0.6));
  animation: hover 1s ease-in-out infinite;
  z-index: 2;
}

@keyframes hover {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}

.player {
  position: absolute;
  width: 28px;
  height: 28px;
  background: #ffff00;
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  transition: all 0.08s;
  filter: drop-shadow(0 0 8px #ffff00);
  z-index: 10;
}

.bomb {
  position: absolute;
  font-size: 1.6rem;
  filter: drop-shadow(0 0 6px rgba(255, 80, 0, 0.8));
  z-index: 5;
}

.game-stats {
  position: absolute;
  top: 10px;
  right: 12px;
  color: #ffff00;
  font-weight: bold;
  display: flex;
  gap: 1rem;
  font-size: 0.95rem;
  text-shadow: 0 0 4px rgba(255, 255, 0, 0.5);
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
  border: 2px solid #ff6600;
  color: #ff6600;
  z-index: 20;
}

.game-over h3 {
  font-size: 2rem;
  margin: 0;
  text-shadow: 0 0 10px rgba(255, 102, 0, 0.7);
}

.game-over p {
  font-size: 1.1rem;
  margin-top: 0.5rem;
  color: #ffaa44;
}

.instructions {
  color: #ffaa66;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
}

.continue-btn {
  display: block;
  margin: 0 auto;
  padding: 0.8rem 2rem;
  background: #ff6600;
  color: #000;
  border: 2px solid #ff6600;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.continue-btn:hover {
  background: #000;
  color: #ff6600;
}
</style>
