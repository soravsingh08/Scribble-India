import React, { useState, useEffect } from 'react'
import { useSocket } from '../context/SocketContext.jsx'
import AvatarSVG from './AvatarSVG.jsx'

export default function Lobby() {
  const { myId, room, messages, startGame, leaveRoom, connected } = useSocket()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('[Lobby] myId:', myId?.slice(0, 8))
      console.log('[Lobby] players:', room?.players?.map(
        p => `${p.name}(${p.id?.slice(0, 6)}) host:${p.isHost}`
      ))
    }
  }, [myId, room?.players])

  if (!room) return null

  const me       = room.players.find(p => p.id === myId)
  const isHost   = me?.isHost ?? false
  const canStart = isHost && (connected ? room.players.length >= 2 : room.players.length >= 1)

  function copyCode() {
    navigator.clipboard.writeText(room.roomCode)
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
      .catch(() => {})
  }
  function copyLink() {
    const url = `${window.location.origin}?join=${room.roomCode}`
    navigator.clipboard.writeText(url)
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
      .catch(() => {})
  }

  const sysMsgs = messages.filter(m => m.type === 'system').slice(-3)

  return (
    <div className="min-h-screen graffiti-wall relative flex items-center justify-center overflow-y-auto">
      {/* 30px desktop padding, normal on mobile */}
      <div className="relative z-10 w-full max-w-[460px] mx-auto px-4 py-5
                      lg:max-w-none lg:w-[calc(100%-60px)] lg:mx-[30px]
                      xl:max-w-[520px] xl:mx-auto space-y-3">

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-start gap-1 select-none">
            <h1 className="graffiti-title text-4xl text-amber-400 leading-none">SCRIBBLE</h1>
            <span className="graffiti-title text-lg text-white leading-none mt-0.5 tracking-[0.18em] opacity-80">
              I&nbsp;N
            </span>
          </div>
          <p className="graffiti-title text-2xl text-white leading-none -mt-0.5">LOBBY</p>
          <p className="text-zinc-500 text-[11px] mt-1">
            {connected ? 'Server connected — real multiplayer' : 'Demo mode — start server for multiplayer'}
          </p>
        </div>

        {/* Room Code */}
        <div className="bg-zinc-900/95 border border-zinc-700 rounded-2xl p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Room Code</p>
              <p className="graffiti-title text-5xl text-amber-400 tracking-[0.15em] leading-tight mt-0.5">
                {room.roomCode}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={copyCode}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs border transition-all ${
                  copied
                    ? 'border-emerald-600 bg-emerald-950/60 text-emerald-400'
                    : 'border-zinc-600 bg-zinc-800 text-zinc-300 hover:border-amber-500 hover:text-amber-300'
                }`}
              >
                {copied ? '✓ Copied!' : 'Copy Code'}
              </button>
              <button
                onClick={copyLink}
                className="px-3 py-1.5 rounded-lg font-bold text-xs border border-zinc-600
                           bg-zinc-800 text-zinc-300 hover:border-violet-600 hover:text-violet-300 transition-all"
              >
                Copy Link
              </button>
            </div>
          </div>
          {/* Settings chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {[
              `${room.players.length}/${room.maxPlayers} players`,
              `${room.totalRounds} rounds`,
              `${room.drawTime}s`,
              room.isPrivate ? 'Private' : 'Public',
            ].map(s => (
              <div key={s}
                className="px-2 py-1 bg-zinc-800 border border-zinc-700
                           rounded-lg text-[11px] font-semibold text-zinc-300">
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Players */}
        <div className="bg-zinc-900/95 border border-zinc-700 rounded-2xl p-4">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">
            Players ({room.players.length}/{room.maxPlayers})
          </p>
          <div className="space-y-2">
            {room.players.map(p => (
              <div
                key={p.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all ${
                  p.id === myId
                    ? 'border-amber-600/50 bg-amber-500/8'
                    : 'border-zinc-700/50 bg-zinc-800/40'
                }`}
              >
                {/* Anime avatar */}
                <div className="shrink-0 w-10 h-10 rounded-xl overflow-hidden
                                border border-zinc-700 bg-zinc-800 flex items-center justify-center">
                  <AvatarSVG id={p.avatar ?? 0} size={40} ring={p.id === myId} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-white font-bold text-sm truncate">{p.name}</span>
                    {p.id === myId && (
                      <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10
                                       px-1.5 py-0.5 rounded border border-amber-600/30 shrink-0">
                        You
                      </span>
                    )}
                    {p.isHost && (
                      <span className="text-[10px] text-violet-300 font-bold bg-violet-500/10
                                       px-1.5 py-0.5 rounded border border-violet-600/30 shrink-0">
                        Host
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: Math.max(0, Math.min(3, room.maxPlayers - room.players.length)) }).map((_, i) => (
              <div key={`slot-${i}`}
                className="flex items-center gap-3 px-3 py-2 rounded-xl border border-dashed
                           border-zinc-800 text-zinc-700">
                <div className="w-10 h-10 rounded-xl border border-dashed border-zinc-700
                                flex items-center justify-center text-zinc-700 text-lg">
                  ?
                </div>
                <span className="text-[12px]">Waiting for player...</span>
              </div>
            ))}
          </div>
        </div>

        {/* System messages */}
        {sysMsgs.length > 0 && (
          <div className="space-y-1">
            {sysMsgs.map(m => (
              <div key={m.id}
                className="bg-zinc-900/80 border border-zinc-700/50 rounded-xl px-3 py-2
                           text-zinc-400 text-xs flex gap-2">
                <span className="shrink-0">ℹ</span>
                <span>{m.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Dev debug */}
        {import.meta.env.DEV && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2
                          font-mono text-[10px] text-zinc-600 space-y-0.5">
            <div>myId: <span className="text-zinc-400">{myId?.slice(0, 12)}</span></div>
            <div>
              isHost: <span className={isHost ? 'text-amber-400' : 'text-red-400'}>{String(isHost)}</span>
              &nbsp;|&nbsp;
              canStart: <span className={canStart ? 'text-emerald-400' : 'text-red-400'}>{String(canStart)}</span>
              &nbsp;|&nbsp;
              players: {room.players.length}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={leaveRoom}
            className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold
                       text-sm rounded-xl border border-zinc-700 transition-all active:scale-95"
          >
            ← Leave
          </button>

          {isHost ? (
            <button
              onClick={startGame}
              disabled={!canStart}
              className={`flex-1 py-3 font-black text-sm rounded-xl border-2 graffiti-text
                          tracking-widest transition-all ${
                canStart
                  ? 'bg-amber-500 hover:bg-amber-400 border-amber-400 text-black hover:scale-[1.01] active:scale-95'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed'
              }`}
            >
              {canStart
                ? 'START GAME'
                : connected
                  ? `Need ${Math.max(0, 2 - room.players.length)} more player(s)`
                  : 'Start server first'
              }
            </button>
          ) : (
            <div className="flex-1 py-3 text-center text-zinc-500 font-bold border-2
                            border-dashed border-zinc-700 rounded-xl text-sm">
              Waiting for host...
            </div>
          )}
        </div>

        <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3 text-[11px] text-zinc-500 leading-relaxed">
          Share <span className="text-amber-400 font-bold">{room.roomCode}</span> with friends, or open
          <span className="text-emerald-400 font-bold"> Incognito</span> to test multiplayer locally.
        </div>

      </div>
    </div>
  )
}
