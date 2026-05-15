import { defineStore } from 'pinia'
import { fixedEvents, randomEvents, minigameEvents } from '../data/events.js'

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

export const useGameStore = defineStore('game', {
  state: () => ({
    day: 0,
    phase: 'menu',
    food: 6,
    water: 4,
    health: 100,
    morale: 100,
    currentEvent: null,
    currentSegment: 0,
    decisionResult: null,
    flags: {
      refugees: false,
    },
    usedRandomEvents: [],
    gameOverReason: null,
    journal: [],
    inventory: {
      medicine: 0,
      bandages: 0,
      batteries: 0,
      radio: 0,
    },
    showInventory: false,
  }),

  getters: {
    maxStat: () => 20,
    maxHealth: () => 100,
    maxMorale: () => 100,
    isGameOver() {
      return this.health <= 0 || this.morale <= 0
    },
    isVictory() {
      return this.day >= 25 && this.health > 0 && this.morale > 0
    },
    survivalDays() {
      return this.day
    },
    totalInventoryItems() {
      return Object.values(this.inventory).reduce((a, b) => a + b, 0)
    },
  },

  actions: {
    startGame() {
      this.day = 0
      this.phase = 'intro'
      this.food = 6
      this.water = 4
      this.health = 100
      this.morale = 100
      this.currentEvent = fixedEvents[0]
      this.currentSegment = 0
      this.decisionResult = null
      this.flags = { refugees: false }
      this.usedRandomEvents = []
      this.gameOverReason = null
      this.journal = []
      this.inventory = { medicine: 0, bandages: 0, batteries: 0, radio: 0 }
      this.showInventory = false
    },

    addToJournal(entry) {
      this.journal.push({
        day: this.day,
        ...entry,
        timestamp: Date.now(),
      })
    },

    addToInventory(item, quantity = 1) {
      if (this.inventory[item] !== undefined) {
        this.inventory[item] += quantity
      }
    },

    removeFromInventory(item, quantity = 1) {
      if (this.inventory[item] !== undefined) {
        this.inventory[item] = Math.max(0, this.inventory[item] - quantity)
      }
    },

    useItem(item) {
      if (this.inventory[item] > 0) {
        this.removeFromInventory(item, 1)

        switch (item) {
          case 'medicine':
            this.health = clamp(this.health + 15, 0, this.maxHealth)
            this.addToJournal({
              type: 'uso',
              title: 'Usaste medicina',
              description: 'Tomaste medicina. +15 salud',
              effects: { health: 15 },
            })
            break
          case 'bandages':
            this.health = clamp(this.health + 8, 0, this.maxHealth)
            this.addToJournal({
              type: 'uso',
              title: 'Usaste vendas',
              description: 'Te vendaste las heridas. +8 salud',
              effects: { health: 8 },
            })
            break
          case 'batteries':
            this.morale = clamp(this.morale + 5, 0, this.maxMorale)
            this.addToJournal({
              type: 'uso',
              title: 'Usaste pilas',
              description: 'Encendiste la radio un rato. +5 moral',
              effects: { morale: 5 },
            })
            break
        }
        return true
      }
      return false
    },

    advanceSegment() {
      if (!this.currentEvent) return

      const isLastSegment = this.currentSegment >= this.currentEvent.segments.length - 1

      if (isLastSegment) {
        if (this.currentEvent.type === 'intro') {
          this.day = 1
          this.advanceDay()
        } else if (this.currentEvent.type === 'victory') {
          this.phase = 'victory'
        } else if (this.currentEvent.decisions) {
          this.phase = 'decision'
        } else {
          this.addToJournal({
            type: 'evento',
            title: this.currentEvent.title || 'Evento aleatorio',
            description: this.currentEvent.segments.map((s) => s.text).join(' '),
          })
          this.day++
          this.advanceDay()
        }
      } else {
        this.currentSegment++
      }
    },

    makeDecision(decisionIndex) {
      const event = this.currentEvent
      const decision = event.decisions[decisionIndex]

      let resultText = ''
      let wasSuccess = true

      if (decision.random) {
        const success = Math.random() < decision.successRate
        const effects = success ? decision.effects.success : decision.effects.failure
        this.applyEffects(effects)
        resultText = success ? decision.successResult : decision.failureResult
        wasSuccess = success
      } else {
        this.applyEffects(decision.effects)
        if (decision.setsFlag) {
          this.flags[decision.setsFlag] = true
        }
        if (decision.givesItem) {
          this.addToInventory(decision.givesItem, decision.giveQuantity || 1)
        }
        resultText = decision.result
      }

      const journalEntry = {
        type: 'decision',
        title: event.title,
        decision: decision.text,
        result: resultText,
        success: wasSuccess,
        effects: decision.random
          ? (wasSuccess ? decision.effects.success : decision.effects.failure)
          : decision.effects,
      }

      if (decision.givesItem) {
        journalEntry.itemReceived = decision.givesItem
        journalEntry.itemQuantity = decision.giveQuantity || 1
      }

      this.addToJournal(journalEntry)

      this.decisionResult = {
        text: resultText,
        success: wasSuccess,
      }

      this.phase = 'result'
    },

    applyEffects(effects) {
      if (effects.food) this.food = clamp(this.food + effects.food, 0, this.maxStat)
      if (effects.water) this.water = clamp(this.water + effects.water, 0, this.maxStat)
      if (effects.health) this.health = clamp(this.health + effects.health, 0, this.maxHealth)
      if (effects.morale) this.morale = clamp(this.morale + effects.morale, 0, this.maxMorale)
    },

    advanceDay() {
      if (this.isGameOver || this.isVictory) {
        this.phase = this.isVictory ? 'victory' : 'gameover'
        return
      }

      if (this.day > 25) {
        this.phase = 'victory'
        return
      }

      this.applyDailyConsumption()

      if (this.isGameOver) {
        this.gameOverReason = this.health <= 0 ? 'health' : 'morale'
        this.phase = 'gameover'
        return
      }

      const minigame = minigameEvents[this.day]
      if (minigame) {
        this.currentEvent = { ...minigame }
        this.phase = 'minigame'
        this.currentSegment = 0
        this.decisionResult = null
        return
      }

      const fixedEvent = fixedEvents[this.day]

      if (fixedEvent) {
        if (fixedEvent.requiresFlag && !this.flags[fixedEvent.requiresFlag]) {
          this.loadRandomEvent()
        } else {
          this.currentEvent = fixedEvent
          this.phase = 'story'
          this.currentSegment = 0
          this.decisionResult = null
        }
      } else {
        this.loadRandomEvent()
      }
    },

    applyDailyConsumption() {
      const hasRefugees = this.flags.refugees
      const foodCost = hasRefugees ? 2 : 1
      const waterCost = hasRefugees ? 2 : 1

      this.food = clamp(this.food - foodCost, 0, this.maxStat)
      this.water = clamp(this.water - waterCost, 0, this.maxStat)

      if (this.food <= 0) {
        this.health = clamp(this.health - 12, 0, this.maxHealth)
      }
      if (this.water <= 0) {
        this.health = clamp(this.health - 15, 0, this.maxHealth)
      }
    },

    loadRandomEvent() {
      if (this.usedRandomEvents.length >= randomEvents.length) {
        this.usedRandomEvents = []
      }

      let randomIndex
      let attempts = 0
      do {
        randomIndex = Math.floor(Math.random() * randomEvents.length)
        attempts++
      } while (this.usedRandomEvents.includes(randomIndex) && attempts < randomEvents.length)

      this.usedRandomEvents.push(randomIndex)

      const event = randomEvents[randomIndex]
      this.currentEvent = {
        ...event,
        day: this.day,
        type: 'random',
      }
      this.phase = 'story'
      this.currentSegment = 0
      this.decisionResult = null
    },

    continueAfterResult() {
      this.decisionResult = null
      this.day++

      if (this.isGameOver) {
        this.gameOverReason = this.health <= 0 ? 'health' : 'morale'
        this.phase = 'gameover'
        return
      }

      if (this.isVictory) {
        this.phase = 'victory'
        return
      }

      this.advanceDay()
    },

    completeMinigame(result) {
      const event = this.currentEvent
      const outcome = result === 'win' ? event.win : event.lose

      this.applyEffects(outcome)

      this.addToJournal({
        type: 'minijuego',
        title: event.title,
        description: outcome.message,
        effects: outcome,
      })

      this.decisionResult = null
      this.day++

      if (this.isGameOver) {
        this.gameOverReason = this.health <= 0 ? 'health' : 'morale'
        this.phase = 'gameover'
        return
      }

      if (this.isVictory) {
        this.phase = 'victory'
        return
      }

      this.advanceDay()
    },

    toggleInventory() {
      this.showInventory = !this.showInventory
    },

    reset() {
      this.$reset()
    },
  },
})
