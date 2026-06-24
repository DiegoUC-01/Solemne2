import { Router } from 'express'
import Game from '../models/Game.js'
import { authMiddleware } from '../middleware/auth.js'
import { fixedEvents, minigameEvents } from '../data/events.js'

const router = Router()
router.use(authMiddleware)

// =====================
// FUNCIONES AUXILIARES
// =====================

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function applyDailyConsumption(game) {
  game.food = clamp(game.food - 1, 0, game.maxStat)
  game.water = clamp(game.water - 1, 0, game.maxStat)
  game.health = clamp(game.health - 4, 0, game.maxHealth)
  game.morale = clamp(game.morale - 3, 0, game.maxMorale)

  if (game.food <= 0) game.health = clamp(game.health - 4, 0, game.maxHealth)
  if (game.water <= 0) game.health = clamp(game.health - 6, 0, game.maxHealth)
  if (game.food <= 0 && game.water <= 0) game.morale = clamp(game.morale - 2, 0, game.maxMorale)
}

function getFixedEvent(day, flags = {}) {
  const events = fixedEvents[day]
  if (!events) return null
  if (!Array.isArray(events)) return events
  for (const ev of events) {
    if (ev.requiresFlags && ev.requiresFlags.every(f => flags[f])) return ev
    if (ev.requiresFlag && flags[ev.requiresFlag]) return ev
    if (ev.requiresNoFlag && !flags[ev.requiresNoFlag]) return ev
  }
  return events[events.length - 1]
}

function getMinigame(day) {
  return minigameEvents[day] || null
}

function applyEffects(game, effects) {
  if (!effects) return
  if (effects.food) game.food = clamp(game.food + effects.food, 0, game.maxStat)
  if (effects.water) game.water = clamp(game.water + effects.water, 0, game.maxStat)
  if (effects.health) game.health = clamp(game.health + effects.health, 0, game.maxHealth)
  if (effects.morale) game.morale = clamp(game.morale + effects.morale, 0, game.maxMorale)
}

// =====================
// RUTAS CRUD DE PARTIDA
// =====================

// POST /api/games — Crear nueva partida (día 0, intro)
router.post('/', async (req, res) => {
  try {
    const game = await Game.create({
      userId: req.userId,
      day: 0,
      phase: 'intro',
      food: 6,
      water: 4,
      health: 80,
      morale: 70,
      currentEvent: fixedEvents[0],
      currentSegment: 0,
      eventsThisDay: 1,
    })

    res.status(201).json(game.toJSON())
  } catch (err) {
    res.status(500).json({ error: 'Error al crear partida' })
  }
})

// GET /api/games/user — Listar partidas del usuario
router.get('/user', async (req, res) => {
  try {
    const games = await Game.find({ userId: req.userId }).sort({ updatedAt: -1 })
    res.json(games.map(g => g.toJSON()))
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener partidas' })
  }
})

// GET /api/games/:id — Obtener una partida
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findOne({ _id: req.params.id, userId: req.userId })
    if (!game) return res.status(404).json({ error: 'Partida no encontrada' })
    res.json(game.toJSON())
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener partida' })
  }
})

// PUT /api/games/:id/start — Iniciar día 1
router.put('/:id/start', async (req, res) => {
  try {
    const game = await Game.findOne({ _id: req.params.id, userId: req.userId })
    if (!game) return res.status(404).json({ error: 'Partida no encontrada' })

    if (game.day !== 0) return res.status(400).json({ error: 'La partida ya fue iniciada' })

    game.day = 1
    applyDailyConsumption(game)

    if (game.health <= 0 || game.morale <= 0) {
      game.phase = 'gameover'
      game.gameOverReason = game.health <= 0 ? 'health' : 'morale'
      game.status = 'lost'
      await game.save()
      return res.json(game.toJSON())
    }

    game.eventsThisDay = 0
    await advanceToNextEvent(game)
    await game.save()
    res.json(game.toJSON())
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar el día' })
  }
})

// PUT /api/games/:id/advance-segment — Avanzar segmento narrativo
router.put('/:id/advance-segment', async (req, res) => {
  try {
    const game = await Game.findOne({ _id: req.params.id, userId: req.userId })
    if (!game) return res.status(404).json({ error: 'Partida no encontrada' })

    if (!game.currentEvent) return res.status(400).json({ error: 'No hay evento activo' })

    const isLastSegment = game.currentSegment >= game.currentEvent.segments.length - 1

    if (isLastSegment) {
      if (game.currentEvent.decisions) {
        game.phase = 'decision'
      } else if (game.currentEvent.type === 'intro') {
        game.currentSegment = game.currentEvent.segments.length - 1
      } else {
        await handleEventEnd(game)
      }
    } else {
      game.currentSegment++
    }

    await game.save()
    res.json(game.toJSON())
  } catch (err) {
    res.status(500).json({ error: 'Error al avanzar segmento' })
  }
})

// PUT /api/games/:id/decision — Procesar decisión
router.put('/:id/decision', async (req, res) => {
  try {
    const game = await Game.findOne({ _id: req.params.id, userId: req.userId })
    if (!game) return res.status(404).json({ error: 'Partida no encontrada' })

    const { decisionIndex } = req.body
    const event = game.currentEvent
    if (!event || !event.decisions) {
      return res.status(400).json({ error: 'No hay decisiones disponibles' })
    }

    const decision = event.decisions[decisionIndex]
    if (!decision) return res.status(400).json({ error: 'Decisión inválida' })

    // Decisiones con riesgo (random)
    if (decision.random) {
      const success = Math.random() < decision.successRate
      const effects = success ? decision.effects.success : decision.effects.failure
      applyEffects(game, effects)
      game.decisionResult = {
        text: success ? decision.successResult : decision.failureResult,
        success,
      }
    } else {
      // Decisiones normales (efectos fijos)
      applyEffects(game, decision.effects)
      if (decision.setsFlag) {
        game.flags = { ...game.flags, [decision.setsFlag]: true }
      }
      game.decisionResult = { text: decision.result, success: true }
    }

    // Registrar en el diario
    game.journal.push({
      day: game.day,
      type: 'decision',
      title: event.title,
      decision: decision.text,
      result: game.decisionResult.text,
      success: game.decisionResult.success,
      effects: decision.random
        ? (game.decisionResult.success ? decision.effects.success : decision.effects.failure)
        : decision.effects,
      timestamp: new Date(),
    })

    game.phase = 'result'
    game.markModified('flags')
    game.markModified('journal')

    // Verificar game over
    if (game.health <= 0 || game.morale <= 0) {
      game.phase = 'gameover'
      game.gameOverReason = game.health <= 0 ? 'health' : 'morale'
      game.status = 'lost'
    }

    await game.save()
    res.json(game.toJSON())
  } catch (err) {
    res.status(500).json({ error: 'Error al procesar decisión' })
  }
})

// =====================
// GESTIÓN DE EVENTOS
// =====================

async function handleEventEnd(game) {
  game.eventsThisDay++

  if (game.eventsThisDay >= game.maxEventsPerDay) {
    game.day++

    if (game.day > 15) {
      if (game.health > 0 && game.morale > 0) {
        game.phase = 'victory'
        game.status = 'won'
      } else {
        game.phase = 'gameover'
        game.gameOverReason = game.health <= 0 ? 'health' : 'morale'
        game.status = 'lost'
      }
      return
    }

    applyDailyConsumption(game)

    if (game.health <= 0 || game.morale <= 0) {
      game.phase = 'gameover'
      game.gameOverReason = game.health <= 0 ? 'health' : 'morale'
      game.status = 'lost'
      return
    }

    game.eventsThisDay = 0
  }

  await advanceToNextEvent(game)
}

async function advanceToNextEvent(game) {
  if (game.eventsThisDay === 0) {
    // Primer evento del día: revisar si es minijuego
    const minigame = getMinigame(game.day)
    if (minigame) {
      game.currentEvent = { ...minigame }
      game.phase = 'minigame'
      game.currentSegment = 0
      game.eventsThisDay = game.maxEventsPerDay
      return
    }

    // Buscar evento fijo del día
    const fixedEvent = getFixedEvent(game.day, game.flags || {})
    if (fixedEvent) {
      game.currentEvent = { ...fixedEvent, type: 'fixed' }
      game.phase = 'story'
      game.currentSegment = 0
      return
    }
  }

  // Si no hay eventos fijos, cargar un random (por ahora placeholder)
  // En el Día 7 esto se reemplazará con eventos IA
  game.currentEvent = getFallbackEvent(game.day)
  game.phase = 'story'
  game.currentSegment = 0
}

// Fallback temporal (se mejora en el Día 7 con Gemini)
const TEMP_FALLBACK = {
  title: 'DIA TRANQUILO',
  location: 'casa',
  image: 'casa_con_tablones',
  segments: [
    { text: 'El dia transcurre sin novedades. Afuera solo se escucha el viento.' },
    { text: 'Revisas tus suministros. Por ahora, todo en orden.' },
  ],
  decisions: [
    {
      text: 'Descansar',
      effects: { food: 0, water: 0, health: 3, morale: 5 },
      result: 'Te recuestas. El silencio te envuelve.',
    },
    {
      text: 'Reforzar refugio',
      effects: { food: 0, water: 0, health: -2, morale: 3 },
      result: 'Aseguras ventanas con tablones. Te sientes mas seguro.',
    },
  ],
}

function getFallbackEvent(day) {
  return { ...TEMP_FALLBACK, day, type: 'ai' }
}

export default router