import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSocket } from '../context/SocketContext.jsx'
import { useCanvas } from '../hooks/useCanvas.js'
import { getMaskedWord, getWordCategory } from '../data/words.js'
import AvatarSVG from './AvatarSVG.jsx'

const CAT_COLORS = {
  food:       'text-orange-400',
  bollywood:  'text-pink-400',
  cricket:    'text-blue-400',
  places:     'text-emerald-400',
  household:  'text-yellow-400',
  transport:  'text-cyan-400',
  festivals:  'text-violet-400',
  nature:     'text-green-400',
  people:     'text-amber-400',
  modern:     'text-indigo-400',
  education:  'text-teal-400',
  general:    'text-zinc-400',
}
const CAT_ICONS = {
  food:'🍛', bollywood:'🎬', cricket:'🏏', places:'🏛️',
  household:'🏠', transport:'🚗', festivals:'🎉', nature:'🦁',
  people:'👨', modern:'📱', education:'🎓', general:'🎯',
}

const COLORS = [
  '#000000','#ffffff','#ef4444','#f97316','#f59e0b',
  '#eab308','#84cc16','#22c55e','#06b6d4','#3b82f6',
  '#8b5cf6','#ec4899','#6b7280','#92400e','#1e40af',
]

const SIZES = [
  { value: 3,  px: 10 },
  { value: 6,  px: 13 },
  { value: 11, px: 17 },
  { value: 18, px: 22 },
  { value: 28, px: 28 },
]

export default function DrawingGame() {
  const { myId, room, messages, sendChat, clearCanvas } = useSocket()

  const [color,     setColor]     = useState('#000000')
  const [brushSize, setBrushSize] = useState(6)
  const [tool,      setTool]      = useState('brush')
  const [chatInput, setChatInput] = useState('')
  const [chatOpen,  setChatOpen]  = useState(false)

  const chatRef  = useRef(null)
  const inputRef = useRef(null)

  const isDrawer = room?.currentDrawerId === myId
  const me       = room?.players.find(p => p.id === myId)
  const drawer   = room?.players.find(p => p.id === room?.currentDrawerId)

  const { canvasRef, initCanvas, handlePointerDown, handlePointerMove, handlePointerUp } =
    useCanvas({ canDraw: isDrawer, color, size: brushSize, tool })

  useEffect(() => { initCanvas() }, [initCanvas, room?.currentDrawerId])

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages])

  useEffect(() => {
    if (!isDrawer) inputRef.current?.focus()
  }, [isDrawer])

  const handleSend = useCallback((e) => {
    e.preventDefault()
    const text = chatInput.trim()
    if (!text) return
    sendChat(text)
    setChatInput('')
  }, [chatInput, sendChat])

  if (!room) return null

  const maskedWord =
    room.maskedWord ||
    (room.currentWord ? getMaskedWord(room.currentWord, room.revealedIndices || []) : '')

  const timePercent = room.drawTime > 0 ? (room.timeLeft / room.drawTime) * 100 : 0
  const isUrgent    = room.timeLeft > 0 && room.timeLeft <= 10
  const newGuess    = messages.length > 0 &&
    (messages[messages.length - 1].type === 'correct' ||
     messages[messages.length - 1].type === 'close')

  const chatMsgs = messages.slice(-60)
  const sorted   = [...(room.players || [])].sort((a, b) => b.score - a.score)

  function WordHint() {
    if (!maskedWord) return null
    return (
      <div className="flex items-end gap-[3px] flex-wrap justify-center">
        {maskedWord.split('').map((ch, i) => {
          if (ch === ' ') return <span key={i} className="w-3" />
          const isBlank = ch === '_'
          return (
            <span key={i} className={`word-letter ${
              isBlank ? 'text-zinc-500 border-zinc-600' : 'text-amber-300 border-amber-400'
            }`}>
              {isBlank ? '\u00A0' : ch}
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <div className="h-[100dvh] bg-[#0e0e0e] flex flex-col overflow-hidden select-none">

      {/* ── TOP BAR ── */}
      <div className="bg-[#141414] border-b border-zinc-800 px-2 py-1.5 flex items-center gap-2 shrink-0 z-10">

        {/* Round */}
        <div className="shrink-0 bg-zinc-800 border border-zinc-700 rounded-md px-2 py-0.5 text-center">
          <div className="text-[9px] font-bold text-zinc-500 uppercase leading-none">Rnd</div>
          <div className="text-white font-black text-xs leading-tight tabular-nums">
            {room.round}/{room.totalRounds}
          </div>
        </div>

        {/* Timer */}
        <div className={`shrink-0 flex items-center gap-1 px-2 py-1 rounded-md border font-black text-sm tabular-nums ${
          isUrgent
            ? 'border-red-600 bg-red-950/60 text-red-400'
            : 'border-zinc-700 bg-zinc-800 text-white'
        }`}>
          {room.timeLeft ?? '--'}s
        </div>

        {/* Progress bar */}
        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isUrgent ? 'bg-red-500' : timePercent > 50 ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
            style={{ width: `${timePercent}%` }}
          />
        </div>

        {/* Word hint */}
        <div className="shrink-0">
          {isDrawer ? (() => {
            const cat = getWordCategory(room.currentWord || '')
            return (
              <div className="bg-zinc-800 border border-amber-600/40 rounded-md px-2.5 py-1">
                <div className="flex items-center gap-1">
                  <span className={`text-[9px] font-bold ${CAT_COLORS[cat] || 'text-zinc-500'}`}>
                    {CAT_ICONS[cat]} {cat}
                  </span>
                </div>
                <div className="text-amber-300 font-black text-xs uppercase tracking-wider">
                  {room.currentWord}
                </div>
              </div>
            )
          })() : (
            <div className="bg-zinc-800 border border-zinc-700 rounded-md px-2.5 py-1 text-center">
              <WordHint />
              {room.currentWord && (
                <div className="text-[9px] text-zinc-600 mt-0.5">
                  {room.currentWord.split('').filter(c=>c!==' ').length} letters
                  {room.currentWord.includes(' ') ? ` · ${room.currentWord.split(' ').length} words` : ''}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile chat toggle */}
        <button
          onClick={() => setChatOpen(v => !v)}
          className="lg:hidden shrink-0 relative w-8 h-8 flex items-center justify-center
                     bg-zinc-800 border border-zinc-700 rounded-md text-xs font-black text-zinc-300"
        >
          {chatOpen ? '✕' : 'Chat'}
          {!chatOpen && newGuess && (
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-amber-500 rounded-full animate-blink" />
          )}
        </button>
      </div>

      {/* ── MAIN LAYOUT ── */}
      {/* Desktop: left scoreboard | canvas | right chat */}
      {/* Mobile: canvas top, tools below, chat inline at bottom */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* LEFT scoreboard — desktop only */}
        <div className="hidden lg:flex flex-col shrink-0" style={{ width: 148, marginLeft: 30 }}>
          <div className="h-full bg-[#111] border-r border-zinc-800 flex flex-col">
            <div className="px-2 pt-2 pb-1 border-b border-zinc-800">
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Players</p>
            </div>
            <div className="flex-1 overflow-y-auto p-1.5 space-y-1.5">
              {sorted.map((p, rank) => (
                <div key={p.id} className={`flex items-center gap-1.5 px-1.5 py-2 rounded-xl border ${
                  p.id === myId ? 'border-amber-600/50 bg-amber-500/8'
                  : p.id === room.currentDrawerId ? 'border-sky-600/40 bg-sky-500/8'
                  : p.hasGuessed ? 'border-emerald-700/40 bg-emerald-500/6'
                  : 'border-zinc-800 bg-zinc-800/20'
                }`}>
                  <div className="shrink-0 w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center
                                  bg-zinc-800 border border-zinc-700 text-[10px] font-black text-zinc-400">
                    {rank === 0 ? '#1' : rank === 1 ? '#2' : rank === 2 ? '#3'
                      : <AvatarSVG id={p.avatar ?? 0} size={28} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold text-[11px] truncate leading-tight ${
                      p.id === myId ? 'text-amber-200'
                      : p.id === room.currentDrawerId ? 'text-sky-200'
                      : p.hasGuessed ? 'text-emerald-200' : 'text-zinc-400'
                    }`}>{p.name}</div>
                    <div className="text-zinc-500 text-[10px] tabular-nums">{p.score}pts</div>
                  </div>
                  {p.hasGuessed && <span className="text-emerald-400 text-[10px] shrink-0">✓</span>}
                  {p.id === room.currentDrawerId && (
                    <span className="text-amber-400 text-[9px] font-black shrink-0">Drawing</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER: Status + Canvas + Tools + Mobile chat */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 min-h-0">

          {/* Status strip */}
          <div className={`px-3 py-1 text-center text-[11px] font-bold border-b shrink-0 ${
            isDrawer ? 'bg-amber-950/40 border-amber-800/30 text-amber-400'
            : me?.hasGuessed ? 'bg-emerald-950/40 border-emerald-800/30 text-emerald-400'
            : 'bg-zinc-900/60 border-zinc-800 text-zinc-500'
          }`}>
            {isDrawer ? 'You are drawing!'
              : me?.hasGuessed ? 'Correct! Cheer others on...'
              : `${drawer?.name ?? 'Someone'} is drawing — type your guess below!`}
          </div>

          {/* CANVAS */}
          <div className="flex-1 flex items-stretch justify-center bg-[#0e0e0e] overflow-hidden min-h-0 p-1.5">
            <CanvasEl
              canvasRef={canvasRef}
              isDrawer={isDrawer}
              handlePointerDown={handlePointerDown}
              handlePointerMove={handlePointerMove}
              handlePointerUp={handlePointerUp}
            />
          </div>

          {/* TOOLS — visible when drawing on any device */}
          {isDrawer && (
            <div className="bg-[#141414] border-t border-zinc-800 shrink-0 px-2 py-1.5">
              <div className="flex items-center gap-1.5 justify-center flex-wrap">
                {/* Brush / Eraser */}
                <div className="flex bg-zinc-800 rounded-lg p-0.5 gap-0.5 border border-zinc-700">
                  {[{ id: 'brush', label: 'Brush' }, { id: 'eraser', label: 'Erase' }].map(t => (
                    <button key={t.id} onClick={() => setTool(t.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                        tool === t.id ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-white'
                      }`}>
                      {t.label}
                    </button>
                  ))}
                </div>
                {/* Sizes */}
                <div className="flex items-center gap-1 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1.5">
                  {SIZES.map(s => (
                    <button key={s.value} onClick={() => setBrushSize(s.value)}
                      className={`rounded-full transition-all ${
                        brushSize === s.value ? 'bg-amber-500 ring-1 ring-amber-400' : 'bg-zinc-600 hover:bg-zinc-400'
                      }`}
                      style={{ width: s.px, height: s.px, minWidth: 10, minHeight: 10 }}
                    />
                  ))}
                </div>
                {/* Colors */}
                <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none">
                  {COLORS.map(c => (
                    <button key={c} onClick={() => { setColor(c); setTool('brush') }}
                      className={`w-5 h-5 rounded shrink-0 transition-all hover:scale-110 active:scale-95 ${
                        color === c && tool === 'brush' ? 'ring-2 ring-white scale-110'
                        : c === '#ffffff' ? 'ring-1 ring-zinc-500' : ''
                      }`}
                      style={{ background: c }}
                    />
                  ))}
                </div>
                {/* Clear */}
                <button onClick={clearCanvas}
                  className="px-2.5 py-1 bg-zinc-800 hover:bg-red-900/40 border border-zinc-700
                             hover:border-red-700 text-zinc-400 hover:text-red-400
                             rounded-lg text-[11px] font-bold transition-all shrink-0">
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* MOBILE: player strip — horizontal scroll */}
          <div className="lg:hidden bg-[#141414] border-t border-zinc-800 flex overflow-x-auto
                          gap-1 px-1.5 py-1 shrink-0 scrollbar-none">
            {sorted.map((p) => (
              <div key={p.id} className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md shrink-0
                border text-[11px] font-bold ${
                p.id === myId ? 'border-amber-600/50 bg-amber-500/10 text-amber-300'
                : p.id === room.currentDrawerId ? 'border-sky-600/40 bg-sky-500/10 text-sky-300'
                : p.hasGuessed ? 'border-emerald-700/40 bg-emerald-500/10 text-emerald-300'
                : 'border-zinc-800 bg-zinc-800/30 text-zinc-400'
              }`}>
                <AvatarSVG id={p.avatar ?? 0} size={16} />
                <span className="max-w-[48px] truncate">{p.name}</span>
                <span className="text-zinc-500 text-[10px]">{p.score}</span>
                {p.hasGuessed && <span className="text-emerald-400 text-[9px] font-black">✓</span>}
              </div>
            ))}
          </div>

          {/* MOBILE: chat — always visible below player strip, compact height */}
          <div className="lg:hidden flex flex-col bg-[#111] border-t border-zinc-800 shrink-0"
               style={{ height: chatOpen ? '38vh' : '44px' }}>
            {/* Chat header / toggle */}
            <button
              onClick={() => setChatOpen(v => !v)}
              className="flex items-center justify-between px-3 py-2.5 w-full border-b border-zinc-800/60 shrink-0"
            >
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                Guesses {chatMsgs.length > 0 ? `(${chatMsgs.length})` : ''}
              </span>
              <span className="text-zinc-600 text-[11px] font-bold">
                {chatOpen ? '▼ hide' : '▲ show'}
              </span>
            </button>

            {chatOpen && (
              <>
                <div ref={chatRef} className="flex-1 overflow-y-auto p-2 space-y-1 min-h-0">
                  {chatMsgs.length === 0 && (
                    <p className="text-zinc-700 text-[11px] text-center py-3 italic">
                      {isDrawer ? 'Start drawing!' : 'Type your guesses!'}
                    </p>
                  )}
                  {chatMsgs.map(msg => <ChatMsg key={msg.id} msg={msg} myId={myId} />)}
                </div>
                <ChatInput
                  isDrawer={isDrawer}
                  hasGuessed={me?.hasGuessed}
                  chatInput={chatInput}
                  setChatInput={setChatInput}
                  handleSend={handleSend}
                  inputRef={null}
                />
              </>
            )}
          </div>
        </div>

        {/* RIGHT chat — desktop only */}
        <div className="hidden lg:flex flex-col shrink-0" style={{ width: 180, marginRight: 30 }}>
          <div className="h-full bg-[#111] border-l border-zinc-800 flex flex-col">
            <div className="px-2.5 py-2 border-b border-zinc-800 shrink-0">
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Guesses</p>
            </div>
            <div ref={chatRef} className="flex-1 overflow-y-auto p-1.5 space-y-1 min-h-0">
              {chatMsgs.length === 0 && (
                <p className="text-zinc-700 text-[11px] text-center py-4 italic">
                  {isDrawer ? 'Start drawing!' : 'Guess below!'}
                </p>
              )}
              {chatMsgs.map(msg => <ChatMsg key={msg.id} msg={msg} myId={myId} />)}
            </div>
            <ChatInput
              isDrawer={isDrawer}
              hasGuessed={me?.hasGuessed}
              chatInput={chatInput}
              setChatInput={setChatInput}
              handleSend={handleSend}
              inputRef={inputRef}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Canvas wrapper — syncs internal resolution to actual CSS size ────────────
// This is the KEY fix: pixel-perfect pointer alignment on all screen sizes
function CanvasEl({ canvasRef, isDrawer, handlePointerDown, handlePointerMove, handlePointerUp }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    // Save current drawing as ImageData before resize
    let saved = null

    function syncSize() {
      const canvas = canvasRef.current
      const wrap = wrapRef.current
      if (!canvas || !wrap) return

      const rect = wrap.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      // On mobile: use full width, allow taller canvas (no fixed ratio)
      // On desktop: keep 4:3 ratio
      const isMobile = rect.width < 640
      let w = rect.width - 4  // small gap
      let h = rect.height - 4

      if (!isMobile) {
        // enforce 4:3 on desktop
        if (w / h > 4 / 3) w = h * (4 / 3)
        else h = w * (3 / 4)
      }
      // On mobile: fill full width, height proportional
      if (isMobile) {
        h = w * (3 / 4)
        if (h > rect.height - 4) {
          h = rect.height - 4
          w = h * (4 / 3)
        }
      }

      w = Math.floor(w)
      h = Math.floor(h)

      // Only resize if actually changed (avoids flicker)
      if (canvas.width === w && canvas.height === h) return

      // Save current pixels
      const ctx = canvas.getContext('2d')
      if (canvas.width > 0 && canvas.height > 0) {
        try { saved = ctx.getImageData(0, 0, canvas.width, canvas.height) } catch (_) {}
      }

      canvas.width  = w
      canvas.height = h
      canvas.style.width  = w + 'px'
      canvas.style.height = h + 'px'

      // Restore white bg
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, w, h)

      // Restore previous drawing scaled
      if (saved && saved.width > 0 && saved.height > 0) {
        const tmp = document.createElement('canvas')
        tmp.width  = saved.width
        tmp.height = saved.height
        tmp.getContext('2d').putImageData(saved, 0, 0)
        ctx.drawImage(tmp, 0, 0, w, h)
      }
    }

    syncSize()
    const ro = new ResizeObserver(syncSize)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [canvasRef])

  return (
    <div
      ref={wrapRef}
      className="w-full h-full flex items-center justify-center"
      style={{ minHeight: 0 }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={isDrawer ? 'cursor-crosshair' : 'cursor-not-allowed'}
        style={{
          touchAction: 'none',
          background: '#ffffff',
          border: isDrawer ? '2px solid #f59e0b' : '2px solid #3f3f46',
          borderRadius: 6,
          display: 'block',
        }}
      />
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────────────────

function ChatMsg({ msg, myId }) {
  if (msg.type === 'system') {
    return (
      <div className="text-center text-zinc-600 text-[10px] italic py-0.5 animate-slide-up">
        {msg.text}
      </div>
    )
  }
  if (msg.type === 'correct') {
    return (
      <div className="px-2 py-1 bg-emerald-950/50 border border-emerald-800/40 rounded-lg animate-slide-up">
        <span className="font-black text-emerald-400 text-[11px]">{msg.playerName}</span>
        <span className="text-emerald-300 text-[11px]"> guessed it!</span>
      </div>
    )
  }
  if (msg.type === 'close') {
    return (
      <div className="px-2 py-1 bg-amber-950/40 border border-amber-800/30 rounded-lg animate-slide-up">
        <span className="font-bold text-amber-400 text-[11px]">{msg.playerName}: </span>
        <span className="text-amber-300 text-[11px]">So close!</span>
      </div>
    )
  }
  return (
    <div className={`px-2 py-1 rounded-lg animate-slide-up ${
      msg.playerId === myId
        ? 'bg-indigo-950/40 border border-indigo-800/30'
        : 'bg-zinc-800/50'
    }`}>
      <span className={`font-bold text-[11px] mr-1 ${
        msg.playerId === myId ? 'text-indigo-400' : 'text-sky-400'
      }`}>
        {msg.playerName}:
      </span>
      <span className="text-zinc-300 text-[11px] break-words">{msg.text}</span>
    </div>
  )
}

function ChatInput({ isDrawer, hasGuessed, chatInput, setChatInput, handleSend, inputRef }) {
  if (isDrawer) {
    return (
      <div className="px-2 py-2 border-t border-zinc-800 shrink-0">
        <div className="text-[11px] text-zinc-600 text-center py-1.5 bg-zinc-800/40
                        rounded-lg border border-zinc-700/40 italic">
          Drawing mode — focus!
        </div>
      </div>
    )
  }
  if (hasGuessed) {
    return (
      <div className="px-2 py-2 border-t border-zinc-800 shrink-0">
        <div className="text-[11px] text-emerald-400 text-center py-1.5 bg-emerald-950/30
                        rounded-lg border border-emerald-800/30">
          Got it! Keep chatting...
        </div>
      </div>
    )
  }
  return (
    <form onSubmit={handleSend} className="px-2 py-2 border-t border-zinc-800 shrink-0 flex gap-1">
      <input
        ref={inputRef}
        type="text"
        value={chatInput}
        onChange={e => setChatInput(e.target.value)}
        placeholder="Type guess..."
        autoComplete="off"
        maxLength={60}
        className="flex-1 min-w-0 bg-zinc-800 border border-zinc-700 rounded-lg
                   px-2.5 py-2 text-white text-xs placeholder-zinc-600
                   focus:outline-none focus:border-amber-500 transition-colors"
      />
      <button
        type="submit"
        className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-black
                   font-black text-xs rounded-lg transition-all active:scale-95"
      >
        ↵
      </button>
    </form>
  )
}
