import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Ruta de health check — útil para saber si el servidor está corriendo
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

async function start() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Backend corriendo en http://localhost:${PORT}`)
  })
}

start()