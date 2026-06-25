import { describe, it, expect } from 'vitest'
import jwt from 'jsonwebtoken'

const SECRET = 'test-secret'

describe('Auth — JWT', () => {
  it('genera un token válido con userId', () => {
    const token = jwt.sign({ userId: 'abc123' }, SECRET, { expiresIn: '7d' })
    expect(token).toBeTruthy()
    expect(typeof token).toBe('string')
  })

  it('decodifica el token correctamente', () => {
    const token = jwt.sign({ userId: 'abc123' }, SECRET, { expiresIn: '7d' })
    const decoded = jwt.verify(token, SECRET)
    expect(decoded.userId).toBe('abc123')
  })

  it('rechaza un token inválido', () => {
    expect(() => jwt.verify('token-falso', SECRET)).toThrow()
  })

  it('rechaza token firmado con otro secret', () => {
    const token = jwt.sign({ userId: 'abc123' }, 'otro-secret')
    expect(() => jwt.verify(token, SECRET)).toThrow()
  })

  it('rechaza token expirado', () => {
    const token = jwt.sign({ userId: 'abc123' }, SECRET, { expiresIn: '0s' })
    // Esperar un poco para que expire
    expect(() => jwt.verify(token, SECRET)).toThrow()
  })
})