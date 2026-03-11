/**
 * ╔══════════════════════════════════════════════════════╗
 * ║          SCRIBBLE INDIA — GAME SERVER                ║
 * ║  4-Layer Architecture: Config → Models → Services → Socket
 * ║  Stack: Node.js + Express + Socket.io + MongoDB      ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * Layer 1 — Config:   config/db.js, config/env.js
 * Layer 2 — Models:   models/GameRoom.js, models/PlayerStats.js
 * Layer 3 — Services: services/wordService.js, services/gameService.js, services/dbService.js
 * Layer 4 — Socket:   socket/gameHandler.js
 */

require('dotenv').config()

const express    = require('express')
const http       = require('http')
const { Server } = require('socket.io')
const cors       = require('cors')
const path       = require('path')

// ── Layer 1: Config ────────────────────────────────────────────────────────────
const ENV            = require('./config/env')
const { connectDB }  = require('./config/db')

// ── Layer 3: Services (for REST routes) ───────────────────────────────────────
const { rooms }                          = require('./services/gameService')
const { getGlobalLeaderboard, getRecentGames } = require('./services/dbService')

// ── Layer 4: Socket Handler ────────────────────────────────────────────────────
const { registerGameHandlers }           = require('./socket/gameHandler')

// ── Express App ───────────────────────────────────────────────────────────────
const app    = express()
const server = http.createServer(app)

// ── Socket.io ─────────────────────────────────────────────────────────────────
const io = new Server(server, {
  cors: {
    origin:  ['http://localhost:5173', 'http://localhost:4173', ENV.CLIENT_URL, '*'],
    methods: ['GET', 'POST'],
  },
  pingTimeout:  60000,
  pingInterval: 25000,
})

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors())
app.use(express.json())

// ── REST API Routes ───────────────────────────────────────────────────────────

// Health check
app.get('/', (req, res) => {
  res.json({
    status:      'ok',
    app:         'Scribble India',
    version:     '2.0.0',
    activeRooms: rooms.size,
    activePlayers: [...rooms.values()].reduce((s, r) => s + r.players.length, 0),
    uptime:      Math.floor(process.uptime()) + 's',
  })
})

// Active rooms (public only)
app.get('/api/rooms', (req, res) => {
  const publicRooms = [...rooms.values()]
    .filter(r => !r.isPrivate && r.phase === 'lobby')
    .map(r => ({
      roomCode:    r.roomCode,
      players:     r.players.length,
      maxPlayers:  r.maxPlayers,
      totalRounds: r.totalRounds,
    }))
  res.json(publicRooms)
})

// Global leaderboard from MongoDB
app.get('/api/leaderboard', async (req, res) => {
  try {
    const data = await getGlobalLeaderboard(10)
    res.json(data)
  } catch {
    res.json([])
  }
})

// Recent completed games from MongoDB
app.get('/api/games/recent', async (req, res) => {
  try {
    const data = await getRecentGames(5)
    res.json(data)
  } catch {
    res.json([])
  }
})

// Room info
app.get('/api/room/:code', (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase())
  if (!room) return res.status(404).json({ error: 'Room not found' })
  res.json({
    roomCode:    room.roomCode,
    phase:       room.phase,
    players:     room.players.length,
    maxPlayers:  room.maxPlayers,
    totalRounds: room.totalRounds,
    round:       room.round,
  })
})

// ── Socket.io Connection ──────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`  [+] Connected: ${socket.id} (total: ${io.engine.clientsCount})`)
  registerGameHandlers(io, socket)
})

// ── Boot ──────────────────────────────────────────────────────────────────────
async function boot() {
  // Connect to MongoDB (non-blocking — game works even if DB is down)
  await connectDB()

  server.listen(ENV.PORT, () => {
    console.log('')
    console.log('  ╔══════════════════════════════════════════════╗')
    console.log('  ║   🎨  Scribble India — Server Ready!         ║')
    console.log(`  ║   http://localhost:${ENV.PORT}                    ║`)
    console.log('  ║                                              ║')
    console.log('  ║   POST  /                  → health check    ║')
    console.log('  ║   GET   /api/rooms         → public rooms    ║')
    console.log('  ║   GET   /api/leaderboard   → global stats    ║')
    console.log('  ║   GET   /api/room/:code    → room info       ║')
    console.log('  ║                                              ║')
    console.log('  ║   500+ Indian words loaded ✅                ║')
    console.log('  ║   MongoDB persistence ✅                     ║')
    console.log('  ║   4-Layer architecture ✅                    ║')
    console.log('  ╚══════════════════════════════════════════════╝')
    console.log('')
  })
}

boot()
