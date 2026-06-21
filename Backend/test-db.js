import './src/config/db.js'
import User from './src/models/User.js'
import mongoose from 'mongoose'
import Game from './src/models/Game.js'
import Dialogue from './src/models/Dialogue.js'

try {
  await mongoose.connect('mongodb://localhost:27017/15dias-test')
  console.log('✓ Conexion OK')
  
  const user = await User.create({ username: 'test', password: '123456' })
  console.log('✓ User creado:', user.toJSON())
  
  await user.deleteOne()
  console.log('✓ User eliminado')
  
  await mongoose.disconnect()
  console.log('✓ Desconectado')
} catch (err) {
  console.error('✗ Error:', err.message)
}