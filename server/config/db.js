/**
 * Layer 1: Database Configuration
 * MongoDB connection using Mongoose
 */

const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI

let isConnected = false

async function connectDB() {
  if (isConnected) return

  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser:    true,
      useUnifiedTopology: true,
    })
    isConnected = true
    console.log('  ✅  MongoDB connected:', mongoose.connection.host)
  } catch (err) {
    console.error('  ❌  MongoDB connection failed:', err.message)
    // App runs without DB — game still works, just no persistence
    console.warn('  ⚠️   Running without DB persistence (game still works!)')
  }
}

module.exports = { connectDB }
