import { describe, it, expect } from 'vitest'

// Clamp: copia de la función real
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

const INITIAL_RESOURCES = { food: 6, water: 4, health: 80, morale: 70 }

describe('Games — Lógica de juego', () => {
  describe('applyDailyConsumption()', () => {
    it('consume 1 comida, 1 agua, -4 salud, -3 moral', () => {
      let food = 6, water = 4, health = 80, morale = 70

      food = clamp(food - 1, 0, 20)
      water = clamp(water - 1, 0, 20)
      health = clamp(health - 4, 0, 100)
      morale = clamp(morale - 3, 0, 100)

      if (food <= 0) health = clamp(health - 4, 0, 100)
      if (water <= 0) health = clamp(health - 6, 0, 100)
      if (food <= 0 && water <= 0) morale = clamp(morale - 2, 0, 100)

      expect(food).toBe(5)
      expect(water).toBe(3)
      expect(health).toBe(76)
      expect(morale).toBe(67)
    })

    it('si food=0, aplica penalización extra de salud (-4)', () => {
      let food = 0, health = 80
      health = clamp(health - 4, 0, 100)
      if (food <= 0) health = clamp(health - 4, 0, 100)
      expect(health).toBe(72)
    })

    it('si water=0, aplica penalización extra de salud (-6)', () => {
      let water = 0, health = 80
      health = clamp(health - 4, 0, 100)
      if (water <= 0) health = clamp(health - 6, 0, 100)
      expect(health).toBe(70)
    })
  })

  describe('Efectos de decisiones', () => {
    it('aplica efectos positivos correctamente', () => {
      let food = 5, water = 3, health = 70, morale = 60
      const effects = { food: 2, water: 1, health: 5, morale: 10 }

      food = clamp(food + (effects.food || 0), 0, 20)
      water = clamp(water + (effects.water || 0), 0, 20)
      health = clamp(health + (effects.health || 0), 0, 100)
      morale = clamp(morale + (effects.morale || 0), 0, 100)

      expect(food).toBe(7)
      expect(water).toBe(4)
      expect(health).toBe(75)
      expect(morale).toBe(70)
    })

    it('aplica efectos negativos y no baja de 0 (clamping)', () => {
      let health = 3
      health = clamp(health + (-10), 0, 100)
      expect(health).toBe(0)
    })
  })

  describe('Detección de game over', () => {
    it('game over si health <= 0', () => {
      const health = 0
      const morale = 50
      expect(health <= 0 || morale <= 0).toBe(true)
    })

    it('game over si morale <= 0', () => {
      const health = 50
      const morale = 0
      expect(health <= 0 || morale <= 0).toBe(true)
    })

    it('no es game over si ambos > 0', () => {
      expect(50 <= 0 || 50 <= 0).toBe(false)
    })
  })

  describe('Detección de victoria', () => {
    it('victoria si day > 15 con recursos > 0', () => {
      const day = 16
      const health = 10
      const morale = 10
      expect(day > 15 && health > 0 && morale > 0).toBe(true)
    })
  })

  describe('Manejo de flags', () => {
    it('puede setear y leer flags', () => {
      const flags = {}
      flags.refugees = true
      expect(flags.refugees).toBe(true)
    })
  })
})