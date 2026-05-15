<template>
  <div class="minigame-container">
    <h2 class="minigame-title">⭕ BUSCAR LATAS EN EL SUPERMERCADO</h2>
    
    <div class="game-area">
      <div class="player" :style="{ left: playerX + '%' }"></div>
      
      <div 
        v-for="(item, idx) in items" 
        :key="idx"
        class="item"
        :style="{ 
          left: item.x + '%', 
          top: item.y + '%',
          background: item.color
        }"
      >
        {{ item.emoji }}
      </div>

      <div v-if="timeLeft <= 0" class="game-over">
        <h3>{{ collected >= 5 ? '¡VICTORIA!' : '¡DERROTA!' }}</h3>
        <p>Latas recolectadas: {{ collected }}/5</p>
      </div>

      <div class="game-stats">
        <span>Tiempo: {{ Math.ceil(timeLeft) }}s</span>
        <span>Recogidas: {{ collected }}/5</span>
      </div>
    </div>

    <div class="instructions">
      Usa IZQUIERDA/DERECHA o A/D para moverte. Recoge 5 latas en 30 segundos.
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
const items = ref([])
const collected = ref(0)
const timeLeft = ref(30)
const gameActive = ref(true)

const generateItems = () => {
  items.value = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 90,
    y: Math.random() * 80,
    color: ['#ff00ff', '#00ffff', '#ffff00', '#ff0088'][Math.floor(Math.random() * 4)],
    emoji: '🥫'
  }))
}

const emitResult = () => {
  emit('complete', collected.value >= 5 ? 'win' : 'lose')
}

const handleKeyPress = (e) => {
  if (!gameActive.value) return
  
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
    playerX.value = Math.max(0, playerX.value - 5)
  } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
    playerX.value = Math.min(95, playerX.value + 5)
  }

  // Detectar colisión con items
  items.value = items.value.filter(item => {
    const distance = Math.abs(playerX.value - item.x)
    if (distance < 5) {
      collected.value++
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
  color: #ffff00;
  text-align: center;
  text-shadow: 2px 2px 0 #ff00ff;
  margin-bottom: 1rem;
}

.game-area {
  position: relative;
  width: 100%;
  height: 300px;
  background: linear-gradient(180deg, #1a0033 0%, #330011 100%);
  border: 2px solid #00ff00;
  overflow: hidden;
  margin-bottom: 1rem;
}

.player {
  position: absolute;
  bottom: 10px;
  width: 30px;
  height: 30px;
  background: #00ff00;
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  transition: left 0.1s;
}

.item {
  position: absolute;
  width: 30px;
  height: 30px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 2s infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.game-stats {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #00ff00;
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
  border: 2px solid #ffff00;
  color: #ffff00;
}

.game-over h3 {
  font-size: 2rem;
  margin: 0;
}

.instructions {
  color: #00ff00;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.continue-btn {
  padding: 0.8rem 2rem;
  background: #00ff00;
  color: #000;
  border: 2px solid #00ff00;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.continue-btn:hover {
  background: #000;
  color: #00ff00;
}
</style>