/**
 * Layer 2: MongoDB Model — PlayerStats
 * Persistent player stats (total wins, games, best score)
 */

const mongoose = require('mongoose')

const PlayerStatsSchema = new mongoose.Schema({
  name:        { type: String, required: true, index: true },
  avatar:      { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
  gamesWon:    { type: Number, default: 0 },
  totalScore:  { type: Number, default: 0 },
  bestScore:   { type: Number, default: 0 },
  wordsDrawn:  { type: Number, default: 0 },
  wordsGuessed:{ type: Number, default: 0 },
  lastPlayed:  { type: Date, default: Date.now },
}, {
  timestamps: true,
})

module.exports = mongoose.model('PlayerStats', PlayerStatsSchema)
