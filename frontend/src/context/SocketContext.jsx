import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { isCorrectGuess, isCloseGuess, getWordChoices, getMaskedWord } from '../data/words.js'

const SocketContext = createContext(null)
export const useSocket = () => useContext(SocketContext)

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export function SocketProvider({ children }) {
  const [myId, setMyId] = useState(() => uid())
  const [myName, setMyName] = useState('')
  const [myAvatar, setMyAvatar] = useState(0)
  const [room, setRoom] = useState(null)
  const [messages, setMessages] = useState([])
  const [phase, setPhase] = useState('landing')
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState('')

  const socketRef = useRef(null)
  const drawCbs = useRef(new Set())
  const clearCbs = useRef(new Set())
  const timerRef = useRef(null)
  const roundRef = useRef(null)

  const clearError = useCallback(() => setError(''), [])

  const addMsg = useCallback((msg) => {
    setMessages(prev => [...prev.slice(-199), msg])
  }, [])

  const addSystem = useCallback((text) => {
    addMsg({ id: uid(), playerId: 'system', playerName: 'System', text, type: 'system', timestamp: Date.now() })
  }, [addMsg])

  // ── Try connecting to real Socket.io server ──────────────────────────────
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { io } = await import('socket.io-client')
        const BACKEND = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BACKEND_URL) || 'http://localhost:3001'
        const socket = io(BACKEND, {
          timeout: 60000,
          reconnectionAttempts: 10,
          transports: ['websocket', 'polling']
        })

        socket.on('connect', () => {
          if (!mounted) return
          setConnected(true)
          socketRef.current = socket
          if (socket.id) setMyId(socket.id)
        })

        socket.on('your:id', (id) => {
          if (!mounted || !id) return
          setMyId(id)
        })

        socket.on('disconnect', () => {
          if (!mounted) return
          setConnected(false)
        })

        socket.on('connect_error', () => {
          if (!mounted) return
          setConnected(false)
          socketRef.current = null
        })

        socket.on('room:update', (r) => {
          if (!mounted) return
          // Always sanitize wordChoices — must be array of plain strings only
          const safe = {
            ...r,
            wordChoices: Array.isArray(r.wordChoices)
              ? r.wordChoices.map(w => {
                if (typeof w === 'string') return w
                if (w && typeof w === 'object') return String(w.word ?? w.text ?? '')
                return String(w ?? '')
              }).filter(w => w.length > 0)
              : [],
          }
          setRoom(safe)
          setPhase(r.phase)
        })

        socket.on('phase:change', (p) => {
          if (!mounted) return
          setPhase(p)
        })

        socket.on('chat:message', (msg) => {
          if (!mounted) return
          addMsg(msg)
        })

        socket.on('draw:event', (evt) => {
          drawCbs.current.forEach(cb => cb(evt))
        })

        socket.on('canvas:clear', () => {
          clearCbs.current.forEach(cb => cb())
        })

        socket.on('room:word-choices', (words) => {
          if (!mounted) return
          // Sanitize — server might send strings or objects {word,category}
          const safeWords = Array.isArray(words)
            ? words.map(w => (typeof w === 'string' ? w : w?.word ?? String(w)))
            : []
          setRoom(prev => prev ? { ...prev, wordChoices: safeWords } : prev)
          setPhase('word-select')
        })

        socket.on('room:current-word', (word) => {
          if (!mounted) return
          setRoom(prev => prev ? { ...prev, currentWord: word } : prev)
        })

        socket.on('room:masked-word', (masked) => {
          if (!mounted) return
          setRoom(prev => prev ? { ...prev, maskedWord: masked } : prev)
        })

        socket.on('room:timer', (t) => {
          if (!mounted) return
          setRoom(prev => prev ? { ...prev, timeLeft: t } : prev)
        })

        socket.on('room:round-result', (players) => {
          if (!mounted) return
          setRoom(prev => prev ? { ...prev, players, phase: 'round-result' } : prev)
          setPhase('round-result')
        })

        socket.on('room:game-over', (players) => {
          if (!mounted) return
          setRoom(prev => prev ? { ...prev, players, phase: 'game-over' } : prev)
          setPhase('game-over')
        })

        socket.on('error:msg', (msg) => {
          if (!mounted) return
          setError(msg)
        })

      } catch (e) {
        console.warn('[Socket] Could not connect:', e)
        setConnected(false)
      }
    })()

    return () => {
      mounted = false
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [addMsg])

  const emit = useCallback((event, data) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data)
      return true
    }
    return false
  }, [])

  // ── DEMO GAME LOOP (when no server) ─────────────────────────────────────
  const demoStartRound = useCallback((roomData) => {
    clearTimeout(timerRef.current)
    clearTimeout(roundRef.current)

    const words = getWordChoices()
    const updatedRoom = {
      ...roomData,
      wordChoices: words,
      currentWord: null,
      maskedWord: null,
      revealedIndices: [],
      timeLeft: roomData.drawTime,
      phase: 'word-select',
      players: roomData.players.map(p => ({ ...p, hasGuessed: false })),
    }
    setRoom(updatedRoom)
    setPhase('word-select')
    addSystem(`Round ${roomData.round} — pick a word!`)
  }, [addSystem])

  const demoStartDrawing = useCallback((word, roomData) => {
    clearTimeout(timerRef.current)
    const masked = getMaskedWord(word, [])
    const drawingRoom = {
      ...roomData,
      currentWord: word,
      maskedWord: masked,
      revealedIndices: [],
      timeLeft: roomData.drawTime,
      phase: 'drawing',
    }
    setRoom(drawingRoom)
    setPhase('drawing')

    let timeLeft = roomData.drawTime
    const revealed = []

    timerRef.current = setInterval(() => {
      timeLeft--

      // Reveal a letter hint at 2/3 and 1/3 time
      if (timeLeft === Math.floor(roomData.drawTime * 0.66) || timeLeft === Math.floor(roomData.drawTime * 0.33)) {
        const unrevealed = word.split('').map((_, i) => i).filter(i => word[i] !== ' ' && !revealed.includes(i))
        if (unrevealed.length > 0) {
          const pick = unrevealed[Math.floor(Math.random() * unrevealed.length)]
          revealed.push(pick)
          const newMasked = getMaskedWord(word, revealed)
          setRoom(prev => prev ? { ...prev, maskedWord: newMasked, revealedIndices: [...revealed], timeLeft } : prev)
          return
        }
      }

      if (timeLeft <= 0) {
        clearInterval(timerRef.current)
        // Show round result
        setRoom(prev => {
          if (!prev) return prev
          addSystem(`⏱ Time's up! The word was: "${word}"`)
          const updated = { ...prev, timeLeft: 0, currentWord: word, phase: 'round-result' }
          // Schedule next round or game over
          roundRef.current = setTimeout(() => {
            const isLast = prev.round >= prev.totalRounds
            if (isLast) {
              setRoom(r => r ? { ...r, phase: 'game-over' } : r)
              setPhase('game-over')
            } else {
              const nextRoom = { ...prev, round: prev.round + 1, phase: 'word-select' }
              demoStartRound(nextRoom)
            }
          }, 5000)
          return updated
        })
        setPhase('round-result')
        return
      }

      setRoom(prev => prev ? { ...prev, timeLeft } : prev)
    }, 1000)
  }, [addSystem, demoStartRound])

  // ── Room Actions ─────────────────────────────────────────────────────────
  const createRoom = useCallback((opts) => {
    const sent = emit('room:create', {
      ...opts,
      playerName: myName.trim() || 'Anonymous',
      avatar: myAvatar,
    })
    if (!sent) {
      const code = Math.random().toString(36).slice(2, 8).toUpperCase()
      const demoRoom = {
        roomCode: code,
        isPrivate: opts.isPrivate,
        maxPlayers: opts.maxPlayers,
        totalRounds: opts.totalRounds,
        drawTime: opts.drawTime,
        round: 1,
        players: [{
          id: myId,
          name: myName.trim() || 'Anonymous',
          avatar: myAvatar,
          score: 0,
          isHost: true,
          hasGuessed: false,
        }],
        currentDrawerId: myId,
        phase: 'lobby',
        timeLeft: opts.drawTime,
        wordChoices: [],
        maskedWord: null,
        currentWord: null,
        revealedIndices: [],
      }
      setRoom(demoRoom)
      setPhase('lobby')
      addSystem('⚠ Demo mode — no server. Start backend for real multiplayer!')
    }
  }, [emit, myId, myName, myAvatar, addSystem])

  const joinRoom = useCallback((code) => {
    const sent = emit('room:join', {
      code: code.trim().toUpperCase(),
      playerName: myName.trim() || 'Anonymous',
      avatar: myAvatar,
    })
    if (!sent) {
      setError('Backend not running. Start the server: cd server && node server.js')
    }
  }, [emit, myName, myAvatar])

  const startGame = useCallback(() => {
    const sent = emit('game:start')
    if (!sent && room) {
      // Demo: start locally
      demoStartRound({ ...room, round: 1 })
    }
  }, [emit, room, demoStartRound])

  const leaveRoom = useCallback(() => {
    emit('room:leave')
    clearTimeout(timerRef.current)
    clearTimeout(roundRef.current)
    setRoom(null)
    setMessages([])
    setPhase('landing')
  }, [emit])

  const selectWord = useCallback((word) => {
    const sent = emit('game:select-word', { word })
    if (!sent && room) {
      demoStartDrawing(word, { ...room, currentDrawerId: myId })
    }
  }, [emit, room, myId, demoStartDrawing])

  const sendChat = useCallback((text) => {
    if (!room) return
    const trimmed = text.trim().slice(0, 80)
    if (!trimmed) return

    const sent = emit('chat:send', { text: trimmed, roomCode: room.roomCode })
    if (!sent) {
      // Demo: check guess locally
      const me = room.players.find(p => p.id === myId)
      if (room.currentWord && room.phase === 'drawing') {
        if (room.currentDrawerId === myId) {
          addSystem("You're drawing — can't guess!")
          return
        }
        if (me?.hasGuessed) {
          addMsg({ id: uid(), playerId: myId, playerName: myName || 'You', text: trimmed, type: 'chat', timestamp: Date.now() })
          return
        }
        if (isCorrectGuess(trimmed, room.currentWord)) {
          const pts = Math.max(50, Math.floor((room.timeLeft / room.drawTime) * 300))
          addMsg({ id: uid(), playerId: myId, playerName: myName || 'You', text: trimmed, type: 'correct', timestamp: Date.now() })
          setRoom(prev => prev ? {
            ...prev,
            players: prev.players.map(p => p.id === myId ? { ...p, score: p.score + pts, hasGuessed: true } : p)
          } : prev)
          return
        }
        if (isCloseGuess(trimmed, room.currentWord)) {
          addMsg({ id: uid(), playerId: myId, playerName: myName || 'You', text: trimmed, type: 'close', timestamp: Date.now() })
          return
        }
      }
      addMsg({ id: uid(), playerId: myId, playerName: myName || 'You', text: trimmed, type: 'chat', timestamp: Date.now() })
    }
  }, [emit, room, myId, myName, addMsg, addSystem])

  const sendDraw = useCallback((evt) => {
    if (!room) return
    emit('draw:event', { ...evt, roomCode: room.roomCode })
  }, [emit, room])

  const clearCanvas = useCallback(() => {
    if (!room) return
    emit('canvas:clear', { roomCode: room.roomCode })
    clearCbs.current.forEach(cb => cb())
  }, [emit, room])

  const onDraw = useCallback((cb) => { drawCbs.current.add(cb) }, [])
  const offDraw = useCallback((cb) => { drawCbs.current.delete(cb) }, [])
  const onClear = useCallback((cb) => { clearCbs.current.add(cb) }, [])
  const offClear = useCallback((cb) => { clearCbs.current.delete(cb) }, [])

  return (
    <SocketContext.Provider value={{
      myId, myName, myAvatar, room, messages, phase, connected, error,
      setMyName, setMyAvatar,
      createRoom, joinRoom, startGame, leaveRoom,
      selectWord, sendChat,
      sendDraw, clearCanvas, onDraw, offDraw, onClear, offClear,
      setPhase, clearError,
    }}>
      {children}
    </SocketContext.Provider>
  )
}
