import { describe, it, expect } from 'vitest'
import { clamp, generateContextHash, buildGamePrompt } from '../services/gemini.js'

describe('Gemini — Utilidades', () => {
  describe('clamp()', () => {
    it('devuelve el valor si está dentro del rango', () => {
      expect(clamp(5, 0, 10)).toBe(5)
    })

    it('devuelve el mínimo si el valor está por debajo', () => {
      expect(clamp(-5, 0, 10)).toBe(0)
    })

    it('devuelve el máximo si el valor está por encima', () => {
      expect(clamp(15, 0, 10)).toBe(10)
    })

    it('funciona en los bordes', () => {
      expect(clamp(0, 0, 10)).toBe(0)
      expect(clamp(10, 0, 10)).toBe(10)
    })
  })

  describe('generateContextHash()', () => {
    it('genera un hash válido (64 caracteres hex)', () => {
      const hash = generateContextHash(5, {}, 5, 3, 70, 60)
      expect(hash).toHaveLength(64)
      expect(hash).toMatch(/^[a-f0-9]+$/)
    })

    it('diferentes contextos generan diferentes hashes', () => {
      const hash1 = generateContextHash(5, {}, 5, 3, 70, 60)
      const hash2 = generateContextHash(6, {}, 5, 3, 70, 60)
      expect(hash1).not.toBe(hash2)
    })

    it('el mismo contexto genera el mismo hash', () => {
      const hash1 = generateContextHash(5, { refugees: true }, 4, 2, 50, 40)
      const hash2 = generateContextHash(5, { refugees: true }, 4, 2, 50, 40)
      expect(hash1).toBe(hash2)
    })
  })

  describe('buildGamePrompt()', () => {
    it('contiene información del estado del juego', () => {
      const prompt = buildGamePrompt(5, {}, 5, 3, 70, 60, 'ninguno', 'contexto de prueba')
      expect(prompt).toContain('5')
      expect(prompt).toContain('Comida')
      expect(prompt).toContain('Salud')
      expect(prompt).toContain('contexto de prueba')
    })

    it('maneja flags vacíos', () => {
      const prompt = buildGamePrompt(5, {}, 5, 3, 70, 60)
      expect(prompt).toContain('ninguno')
    })
  })
})