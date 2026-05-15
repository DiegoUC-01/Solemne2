<template>
  <div class="minigame-container">
    <h2 class="minigame-title">🚁 ESCAPE FINAL</h2>
    
    <div class="game-area">
      <div class="helicopter">🚁</div>
      
      <div class="player" :style="{ left: playerX + '%', bottom: playerY + '%' }"></div>
      
      <div 
        v-for="(bomb, idx) in bombs" 
        :key="idx"
        class="bomb"
        :style="{ 
          left: bomb.x + '%',
          top: bomb.y + '%'
        }"
      >
        💣
      </div>

      <div v-if="timeLeft <= 0" class="game-over">
        <h3>{{ escaped ? '¡RESCATADO!' : '¡GOLPEADO!' }}</h3>
        <p>{{ escaped ? 'Alcanzaste el helicóptero' : 'Fue derribado por una bomba' }}</p>
      </div>

      <div class="game-stats">
        <span>Tiempo: {{ Math.ceil(timeLeft) }}s</span>
        <span>Vida: {{ health }}/100</span>
      </div>
    </div>

    <div class="instructions">
      Usa IZQUIERDA/DERECHA y ARRIBA/ABAJO para moverte. Esquiva las bombas y llega al helicóptero en 20 segundos.
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

const playerX = ref(50)
const playerY = ref(10)
const bombs = ref([])
const escaped = ref(false)
const health = ref(100)
const timeLeft = ref(20)
const gameActive = ref(true)

const generateBombs = () => {
  setInterval(() => {
    if (gameActive.value && timeLeft.value > 0) {
      bombs.value.push({
        x: Math.random() * 90,
        y: -5,
        id: Math.random()
      })
    }
  }, 300)
}

const updateBombs = () => {
  bombs.value = bombs.value.filter(bomb => {
    bomb.y += 1.5

    // Detectar colisión con el jugador
    if (bomb.y > playerY.value - 5 && bomb.y < playerY.value + 5) {
      const distance = Math.abs(playerX.value - bomb.x)
      if (distance < 8) {
        health.value = Math.max(0, health.value - 20)
      }
    }

    return bomb.y < 100
  })

  // Detectar si llegó al helicóptero
  if (playerY.value > 90 && playerX.value > 45 && playerX.value < 55) {
    escaped.value = true
    gameActive.value = false
  }
}

const emitResult = () => {
  emit('complete', escaped.value ? 'win' : 'lose')
}

const handleKeyPress = (e) => {
  if (!gameActive.value) return
  
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    playerX.value = Math.max(0, playerX.value - 3)
  } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    playerX.value = Math.min(95, playerX.value + 3)
  } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
    playerY.value = Math.min(85, playerY.value + 3)
  } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
    playerY.value = Math.max(0, playerY.value - 3)
  }
}

const updateTimer = () => {
  if (timeLeft.value > 0) {
    timeLeft.value -= 0.1
    updateBombs()
  } else {
    gameActive.value = false
  }
}

onMounted(() => {
  generateBombs()
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
  color: #ff6600;
  text-align: center;
  text-shadow: 2px 2px 0 #ff0000;
  margin-bottom: 1rem;
}

.game-area {
  position: relative;
  width: 100%;
  height: 400px;
  background: linear-gradient(180deg, #330066 0%, #660033 100%);
  border: 2px solid #ff6600;
  overflow: hidden;
  margin-bottom: 1rem;
}

.helicopter {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
  animation: hover 1s infinite ease-in-out;
}

@keyframes hover {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}

.player {
  position: absolute;
  width: 30px;
  height: 30px;
  background: #ffff00;
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  transition: all 0.1s;
}

.bomb {
  position: absolute;
  font-size: 1.5rem;
  animation: fall linear forwards;
}

@keyframes fall {
  to {
    transform: translateY(500px);
  }
}

.game-stats {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ffff00;
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
  border: 2px solid #ff6600;
  color: #ff6600;
}

.game-over h3 {
  font-size: 2rem;
  margin: 0;
}

.instructions {
  color: #ff6600;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.continue-btn {
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