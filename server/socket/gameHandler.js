/**
 * Layer 4: Socket Handler — Game Events
 * Handles all game-related socket events:
 * room:create, room:join, game:start, game:select-word,
 * chat:send, draw:event, canvas:clear, room:leave
 */

const ENV          = require('../config/env')
const {
  createRoom, getRoom, deleteRoom,
  addPlayer, removePlayer,
  roomPayload, getLeaderboard,
}                  = require('../services/gameService')
const {
  isCorrect, isClose,
  getWordChoices, getMaskedWord, getCategoryOf,
}                  = require('../services/wordService')
const { saveGame } = require('../services/dbService')

// ── Helper: broadcast room state to all players ───────────────────────────────
function broadcastRoom(io, room) {
  io.to(room.roomCode).emit('room:update', roomPayload(room)) 
}

// ── Helper: system chat message ───────────────────────────────────────────────
function sysMsg(io, roomCode, text) {
  io.to(roomCode).emit('chat:message', {
    id:         Date.now().toString(),
    playerId:   'system',
    playerName: 'System',
    text,
    type:       'system',
    timestamp:  Date.now(),
  })
}

// ── Start a round ──────────────────────────────────────────────────────────────
function startRound(io, room) {
  clearInterval(room.timerInterval)
  clearTimeout(room.wordSelectTimeout)

  // Reset guesses
  room.players.forEach(p => { p.hasGuessed = false })

  // Build draw order if empty
  if (!room.drawOrder || room.drawOrder.length === 0) {
    room.drawOrder = [...room.players.map(p => p.id)].sort(() => Math.random() - 0.5)
  }

  // Pick drawer round-robin
  const idx = (room.round - 1) % room.drawOrder.length
  room.currentDrawerId = room.drawOrder[idx] || room.players[0].id

  const choices = getWordChoices()
  room.wordChoices      = choices
  room.currentWord      = null
  room.currentCategory  = null
  room.maskedWord       = null
  room.revealedIndices  = []
  room.phase            = 'word-select'
  room.timeLeft         = room.drawTime

  broadcastRoom(io, room)

  // Send word choices ONLY to drawer — force plain strings, no objects!
  const cleanChoices = choices.map(w => {
    if (typeof w === 'string') return w.trim()
    if (w && typeof w === 'object') return String(w.word ?? w.text ?? '').trim()
    return String(w ?? '').trim()
  }).filter(w => w.length > 0)

  console.log(`  [W] Word choices for drawer: ${cleanChoices.join(', ')}`)
  io.to(room.currentDrawerId).emit('room:word-choices', cleanChoices)

  // Auto-pick first word after 15s
  // choices[0] is a plain string — NOT an object!
  room.wordSelectTimeout = setTimeout(() => {
    if (!room.currentWord && room.phase === 'word-select') {
      const autoWord = typeof choices[0] === 'string' ? choices[0] : choices[0].word
      beginDrawingPhase(io, room, autoWord, getCategoryOf(autoWord))
    }
  }, ENV.GAME.WORD_SELECT_TIME * 1000)
}

// ── Begin drawing phase ────────────────────────────────────────────────────────
function beginDrawingPhase(io, room, word, category) {
  clearTimeout(room.wordSelectTimeout)
  clearInterval(room.timerInterval)

  room.currentWord     = word
  room.currentCategory = category || getCategoryOf(word)
  room.maskedWord      = getMaskedWord(word, [])
  room.revealedIndices = []
  room.phase           = 'drawing'
  room.timeLeft        = room.drawTime

  // Tell drawer their secret word
  io.to(room.currentDrawerId).emit('room:current-word', word)

  // Tell all others the masked word
  room.players.forEach(p => {
    if (p.id !== room.currentDrawerId) {
      io.to(p.id).emit('room:masked-word', room.maskedWord)
    }
  })

  broadcastRoom(io, room)

  let timeLeft  = room.drawTime
  const revealed = []

  room.timerInterval = setInterval(() => {
    timeLeft--
    room.timeLeft = timeLeft
    io.to(room.roomCode).emit('room:timer', timeLeft)

    // Reveal 1 hint letter at 66% and 33% of time remaining
    const t66 = Math.floor(room.drawTime * 0.66)
    const t33 = Math.floor(room.drawTime * 0.33)

    if (timeLeft === t66 || timeLeft === t33) {
      const unrevealed = word
        .split('')
        .map((_, i) => i)
        .filter(i => word[i] !== ' ' && !revealed.includes(i))

      if (unrevealed.length > 0) {
        const pick = unrevealed[Math.floor(Math.random() * unrevealed.length)]
        revealed.push(pick)
        room.revealedIndices = [...revealed]
        room.maskedWord      = getMaskedWord(word, revealed)
        io.to(room.roomCode).emit('room:reveal-letter', [...revealed])
        sysMsg(io, room.roomCode, `💡 A letter has been revealed!`)
      }
    }

    if (timeLeft <= 0) {
      clearInterval(room.timerInterval)
      endRound(io, room)
    }
  }, 1000)
}

// ── End round ─────────────────────────────────────────────────────────────────
function endRound(io, room) {
  clearInterval(room.timerInterval)

  // Save round history
  const drawer = room.players.find(p => p.id === room.currentDrawerId)
  room.roundHistory = room.roundHistory || []
  room.roundHistory.push({
    roundNumber: room.round,
    word:        room.currentWord,
    category:    room.currentCategory,
    drawerId:    room.currentDrawerId,
    drawerName:  drawer?.name || 'Unknown',
    guessedBy:   room.players
      .filter(p => p.hasGuessed)
      .map(p => ({ name: p.name })),
  })

  // Reveal word to everyone
  io.to(room.roomCode).emit('room:current-word', room.currentWord)
  sysMsg(io, room.roomCode, `🎯 The word was: "${room.currentWord}"`)

  const isLast = room.round >= room.totalRounds

  if (isLast) {
    room.phase = 'game-over'
    const leaderboard = getLeaderboard(room)
    io.to(room.roomCode).emit('room:game-over', leaderboard)
    broadcastRoom(io, room)

    // Save to MongoDB
    saveGame(room).catch(() => {})

    // Auto-cleanup after 5 min
    setTimeout(() => deleteRoom(room.roomCode), 5 * 60 * 1000)
  } else {
    room.phase = 'round-result'
    io.to(room.roomCode).emit('room:round-result', getLeaderboard(room))
    broadcastRoom(io, room)

    // Start next round after 6s
    setTimeout(() => {
      const r = getRoom(room.roomCode)
      if (r && r.players.length >= 1) {
        r.round++
        startRound(io, r)
      }
    }, ENV.GAME.RESULT_WAIT_TIME)
  }
}

// ── Register all socket event handlers ────────────────────────────────────────
function registerGameHandlers(io, socket) {

  // Send socket id to client immediately
  socket.emit('your:id', socket.id)

  // ── Create Room ─────────────────────────────────────────────────────────────
  socket.on('room:create', (data) => {
    const room = createRoom(
      data,
      socket.id,
      data.playerName || 'Anonymous',
      data.avatar     ?? 0,
    )
    socket.join(room.roomCode)
    socket.data.roomCode = room.roomCode
    socket.data.name     = data.playerName

    console.log(`  [+] Room created: ${room.roomCode} by "${data.playerName}"`)
    broadcastRoom(io, room)
  })

  // ── Join Room ───────────────────────────────────────────────────────────────
  socket.on('room:join', (data) => {
    const code = (data.code || '').toUpperCase().trim()
    const room = getRoom(code)

    if (!room) {
      socket.emit('error:msg', `Room "${code}" not found. Check the code!`)
      return
    }
    if (room.players.length >= room.maxPlayers) {
      socket.emit('error:msg', 'Room is full! Try another room.')
      return
    }
    if (room.phase !== 'lobby') {
      socket.emit('error:msg', 'Game already started. Wait for next game!')
      return
    }

    const player = addPlayer(room, socket.id, data.playerName, data.avatar)
    if (!player) {
      // Already in room — just sync
      broadcastRoom(io, room)
      return
    }

    socket.join(code)
    socket.data.roomCode = code
    socket.data.name     = data.playerName

    console.log(`  [+] "${data.playerName}" joined room: ${code}`)
    sysMsg(io, code, `👋 ${player.name} joined the room!`)
    broadcastRoom(io, room)
  })

  // ── Start Game ──────────────────────────────────────────────────────────────
  socket.on('game:start', () => {
    const code = socket.data.roomCode
    const room = getRoom(code)
    if (!room) { socket.emit('error:msg', 'Room not found!'); return }

    const player = room.players.find(p => p.id === socket.id)
    if (!player?.isHost) {
      socket.emit('error:msg', 'Only the host can start the game.')
      return
    }
    if (room.players.length < ENV.GAME.MIN_PLAYERS) {
      socket.emit('error:msg', `Need at least ${ENV.GAME.MIN_PLAYERS} players to start!`)
      return
    }

    console.log(`  [▶] Game started in room: ${code} (${room.players.length} players)`)
    room.startedAt = new Date()
    room.round = 1
    startRound(io, room)
  })

  // ── Select Word ─────────────────────────────────────────────────────────────
  socket.on('game:select-word', (data) => {
    const code = socket.data.roomCode
    const room = getRoom(code)
    if (!room) return
    if (room.currentDrawerId !== socket.id) {
      socket.emit('error:msg', "It's not your turn to draw!")
      return
    }

    // wordChoices are plain strings
    const selectedWord = (data.word || '').toString().trim().toLowerCase()
    const validWords   = room.wordChoices.map(w =>
      typeof w === 'string' ? w.toLowerCase() : (w.word || '').toLowerCase()
    )

    if (!validWords.includes(selectedWord)) {
      socket.emit('error:msg', 'Invalid word choice.')
      return
    }

    console.log(`  [W] Word selected: "${selectedWord}" in ${code}`)
    beginDrawingPhase(io, room, selectedWord, getCategoryOf(selectedWord))
  })

  // ── Chat / Guess ─────────────────────────────────────────────────────────────
  socket.on('chat:send', (data) => {
    const code = socket.data.roomCode
    const room = getRoom(code)
    if (!room) return

    const player = room.players.find(p => p.id === socket.id)
    if (!player) return

    const text = (data.text || '').trim().slice(0, 100)
    if (!text) return

    // Drawer can't type guesses
    if (socket.id === room.currentDrawerId) {
      socket.emit('chat:message', {
        id:         Date.now().toString(),
        playerId:   'system',
        playerName: 'System',
        text:       "You're drawing — keep it secret! 🤫",
        type:       'system',
        timestamp:  Date.now(),
      })
      return
    }

    // Already guessed — normal chat only
    if (player.hasGuessed) {
      io.to(room.roomCode).emit('chat:message', {
        id:         Date.now().toString(),
        playerId:   player.id,
        playerName: player.name,
        text,
        type:       'chat',
        timestamp:  Date.now(),
      })
      return
    }

    // Check correct answer
    if (room.phase === 'drawing' && room.currentWord && isCorrect(text, room.currentWord)) {
      const pct = room.timeLeft / room.drawTime
      const pts = Math.max(ENV.GAME.MIN_SCORE, Math.floor(pct * ENV.GAME.MAX_SCORE))

      player.score     += pts
      player.hasGuessed = true
      player.roundScores = [...(player.roundScores || []), pts]

      // Drawer also earns points
      const drawer = room.players.find(p => p.id === room.currentDrawerId)
      if (drawer) {
        const drawerPts = Math.floor(pts * 0.5)
        drawer.score += drawerPts
      }

      io.to(room.roomCode).emit('chat:message', {
        id:         Date.now().toString(),
        playerId:   player.id,
        playerName: player.name,
        text:       '✅ Guessed it!',
        type:       'correct',
        pts,
        timestamp:  Date.now(),
      })

      broadcastRoom(io, room)

      // End early if all guessed
      const guessers = room.players.filter(p => p.id !== room.currentDrawerId)
      if (guessers.length > 0 && guessers.every(p => p.hasGuessed)) {
        clearInterval(room.timerInterval)
        sysMsg(io, room.roomCode, '🎉 Everyone guessed it! Round over!')
        setTimeout(() => endRound(io, room), 2000)
      }
      return
    }

    // Close guess
    if (room.phase === 'drawing' && room.currentWord && isClose(text, room.currentWord)) {
      io.to(room.roomCode).emit('chat:message', {
        id:         Date.now().toString(),
        playerId:   player.id,
        playerName: player.name,
        text,
        type:       'close',
        timestamp:  Date.now(),
      })
      return
    }

    // Normal message
    io.to(room.roomCode).emit('chat:message', {
      id:         Date.now().toString(),
      playerId:   player.id,
      playerName: player.name,
      text,
      type:       'chat',
      timestamp:  Date.now(),
    })
  })

  // ── Draw Event ───────────────────────────────────────────────────────────────
  socket.on('draw:event', (data) => {
    const code = socket.data.roomCode
    const room = getRoom(code)
    if (!room || room.currentDrawerId !== socket.id) return
    socket.to(code).emit('draw:event', data)
  })

  // ── Canvas Clear ─────────────────────────────────────────────────────────────
  socket.on('canvas:clear', () => {
    const code = socket.data.roomCode
    const room = getRoom(code)
    if (!room || room.currentDrawerId !== socket.id) return
    socket.to(code).emit('canvas:clear')
  })

  // ── Leave Room ───────────────────────────────────────────────────────────────
  socket.on('room:leave', () => handleLeave(io, socket))
  socket.on('disconnect', () => handleLeave(io, socket))
}

// ── Handle player leaving ──────────────────────────────────────────────────────
function handleLeave(io, socket) {
  const code = socket.data.roomCode
  if (!code) return
  const room = getRoom(code)
  if (!room) return

  const leavingPlayer = room.players.find(p => p.id === socket.id)
  const name = leavingPlayer?.name || 'Someone'

  console.log(`  [-] "${name}" left room: ${code}`)

  const newHostName = removePlayer(room, socket.id)

  if (room.players.length === 0) {
    deleteRoom(code)
    console.log(`  [x] Room deleted (empty): ${code}`)
    return
  }

  if (newHostName) {
    sysMsg(io, code, `👑 ${newHostName} is the new host.`)
  } else {
    sysMsg(io, code, `👋 ${name} left the room.`)
  }

  // If drawer left mid-game, end round early
  if (room.phase === 'drawing' && room.currentDrawerId === socket.id) {
    clearInterval(room.timerInterval)
    sysMsg(io, code, '✏️ The drawer left — skipping round.')
    setTimeout(() => {
      const r = getRoom(code)
      if (r) endRound(io, r)
    }, 2000)
  }

  broadcastRoom(io, room)
}

module.exports = { registerGameHandlers }
