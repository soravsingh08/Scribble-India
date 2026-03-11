/**
 * Layer 3: Game Service
 * Room creation, player management, game state logic
 * Pure functions — no socket.io dependency
 */

const { getWordChoices, getMaskedWord } = require('./wordService')
const ENV = require('../config/env')

// ── In-memory room store ───────────────────────────────────────────────────────
// Map<roomCode, RoomState>
const rooms = new Map()

// ── ID generator ──────────────────────────────────────────────────────────────
function uid(len = 6) {
  return Math.random().toString(36).slice(2, 2 + len).toUpperCase()
}

// ── Create a new room ──────────────────────────────────────────────────────────
function createRoom(opts, hostSocketId, hostName, hostAvatar) {
  const code = uid(6)
  const room = {
    roomCode:         code,
    isPrivate:        opts.isPrivate    ?? true,
    maxPlayers:       opts.maxPlayers   ?? ENV.GAME.MAX_PLAYERS,
    totalRounds:      opts.totalRounds  ?? ENV.GAME.DEFAULT_ROUNDS,
    drawTime:         opts.drawTime     ?? ENV.GAME.DEFAULT_DRAW_TIME,
    round:            0,
    players:          [{
      id:          hostSocketId,
      name:        hostName  || 'Anonymous',
      avatar:      hostAvatar ?? 0,
      score:       0,
      isHost:      true,
      hasGuessed:  false,
      roundScores: [],
    }],
    currentDrawerId:  null,
    phase:            'lobby',
    timeLeft:         0,
    wordChoices:      [],
    currentWord:      null,
    currentCategory:  null,
    maskedWord:       null,
    revealedIndices:  [],
    drawOrder:        [],
    roundHistory:     [],
    startedAt:        null,
    // Non-serializable — not sent to clients
    timerInterval:    null,
    wordSelectTimeout:null,
  }
  rooms.set(code, room)
  return room
}

// ── Get room ───────────────────────────────────────────────────────────────────
function getRoom(code) {
  return rooms.get((code || '').toUpperCase().trim())
}

// ── Delete room ────────────────────────────────────────────────────────────────
function deleteRoom(code) {
  const room = getRoom(code)
  if (room) {
    clearInterval(room.timerInterval)
    clearTimeout(room.wordSelectTimeout)
    rooms.delete(code)
  }
}

// ── Add player to room ─────────────────────────────────────────────────────────
function addPlayer(room, socketId, name, avatar) {
  if (room.players.find(p => p.id === socketId)) return null // already in
  const player = {
    id:          socketId,
    name:        name    || 'Anonymous',
    avatar:      avatar  ?? 0,
    score:       0,
    isHost:      false,
    hasGuessed:  false,
    roundScores: [],
  }
  room.players.push(player)
  return player
}

// ── Remove player from room ────────────────────────────────────────────────────
function removePlayer(room, socketId) {
  room.players = room.players.filter(p => p.id !== socketId)
  // Reassign host if needed
  if (room.players.length > 0 && !room.players.some(p => p.isHost)) {
    room.players[0].isHost = true
    return room.players[0].name // new host name
  }
  return null
}

// ── Strip non-serializable fields before sending to client ────────────────────
// wordChoices is sent ONLY to drawer via room:word-choices — NOT in broadcast!
function roomPayload(room) {
  const { timerInterval, wordSelectTimeout, wordChoices, ...safe } = room
  // Always send empty wordChoices in broadcast — real choices go via room:word-choices only to drawer
  return { ...safe, wordChoices: [] }
}

// ── Get sorted leaderboard ─────────────────────────────────────────────────────
function getLeaderboard(room) {
  return [...room.players].sort((a, b) => b.score - a.score)
}

module.exports = {
  rooms,
  uid,
  createRoom,
  getRoom,
  deleteRoom,
  addPlayer,
  removePlayer,
  roomPayload,
  getLeaderboard,
}
