/**
 * Layer 3: Database Service
 * Save/read game data from MongoDB
 * All functions are safe — if DB is down, they fail silently
 */

let GameRoom, PlayerStats

// Lazy-load models (only if mongoose is connected)
function getModels() {
  if (!GameRoom) {
    try {
      GameRoom    = require('../models/GameRoom')
      PlayerStats = require('../models/PlayerStats')
    } catch (e) {
      return false
    }
  }
  return true
}

// ── Save completed game to MongoDB ─────────────────────────────────────────────
async function saveGame(room) {
  if (!getModels()) return
  try {
    const sorted = [...room.players].sort((a, b) => b.score - a.score)
    const winner = sorted[0]

    const doc = new GameRoom({
      roomCode:    room.roomCode,
      isPrivate:   room.isPrivate,
      totalRounds: room.totalRounds,
      drawTime:    room.drawTime,
      players:     sorted.map((p, i) => ({
        socketId: p.id,
        name:     p.name,
        avatar:   p.avatar,
        score:    p.score,
        rank:     i + 1,
      })),
      rounds:      room.roundHistory || [],
      winnerId:    winner?.id,
      winnerName:  winner?.name,
      startedAt:   room.startedAt || new Date(),
      endedAt:     new Date(),
      duration:    room.startedAt
        ? Math.floor((Date.now() - new Date(room.startedAt).getTime()) / 1000)
        : 0,
    })

    await doc.save()
    console.log(`  💾  Game saved to MongoDB: ${room.roomCode}`)

    // Update player stats
    for (const p of room.players) {
      await updatePlayerStats(p, winner?.id === p.id, room)
    }
  } catch (err) {
    console.error('  ⚠️   DB save failed (non-critical):', err.message)
  }
}

// ── Update player lifetime stats ───────────────────────────────────────────────
async function updatePlayerStats(player, isWinner, room) {
  if (!getModels()) return
  try {
    await PlayerStats.findOneAndUpdate(
      { name: player.name },
      {
        $inc: {
          gamesPlayed:  1,
          gamesWon:     isWinner ? 1 : 0,
          totalScore:   player.score,
          wordsGuessed: player.roundScores?.length || 0,
        },
        $max:  { bestScore: player.score },
        $set:  { avatar: player.avatar, lastPlayed: new Date() },
      },
      { upsert: true, new: true }
    )
  } catch (err) {
    console.error('  ⚠️   PlayerStats update failed:', err.message)
  }
}

// ── Get global leaderboard ─────────────────────────────────────────────────────
async function getGlobalLeaderboard(limit = 10) {
  if (!getModels()) return []
  try {
    return await PlayerStats
      .find({})
      .sort({ totalScore: -1 })
      .limit(limit)
      .lean()
  } catch (err) {
    return []
  }
}

// ── Get recent games ───────────────────────────────────────────────────────────
async function getRecentGames(limit = 5) {
  if (!getModels()) return []
  try {
    return await GameRoom
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
  } catch (err) {
    return []
  }
}

module.exports = {
  saveGame,
  updatePlayerStats,
  getGlobalLeaderboard,
  getRecentGames,
}
