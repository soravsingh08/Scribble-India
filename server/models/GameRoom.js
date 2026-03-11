/**
 * Layer 2: MongoDB Model — GameRoom
 * Stores completed game sessions for stats/history
 */

const mongoose = require('mongoose')

const PlayerResultSchema = new mongoose.Schema({
  socketId: { type: String },
  name:     { type: String, required: true },
  avatar:   { type: Number, default: 0 },
  score:    { type: Number, default: 0 },
  rank:     { type: Number, default: 0 },
})

const RoundSchema = new mongoose.Schema({
  roundNumber: { type: Number },
  word:        { type: String },
  category:    { type: String },
  drawerId:    { type: String },
  drawerName:  { type: String },
  guessedBy:   [{ name: String, timeLeft: Number, points: Number }],
  drawTime:    { type: Number },
})

const GameRoomSchema = new mongoose.Schema({
  roomCode:    { type: String, required: true, index: true },
  isPrivate:   { type: Boolean, default: true },
  totalRounds: { type: Number, default: 3 },
  drawTime:    { type: Number, default: 80 },
  players:     [PlayerResultSchema],
  rounds:      [RoundSchema],
  winnerId:    { type: String },
  winnerName:  { type: String },
  startedAt:   { type: Date, default: Date.now },
  endedAt:     { type: Date },
  duration:    { type: Number }, // seconds
}, {
  timestamps: true,
})

// Index for quick lookup
GameRoomSchema.index({ roomCode: 1, createdAt: -1 })

module.exports = mongoose.model('GameRoom', GameRoomSchema)
