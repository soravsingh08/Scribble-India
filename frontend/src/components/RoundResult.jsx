import React, { useEffect, useState } from 'react'
import { useSocket } from '../context/SocketContext.jsx'
import AvatarSVG from './AvatarSVG.jsx'
import { getWordCategory } from '../data/words.js'

function getTitle(rank) {
  if (rank === 0) return 'Ekdum First!'
  if (rank === 1) return 'Bahut Acha!'
  if (rank === 2) return 'Theek Hai Bhai'
  return 'Agli Baar Pakka!'
}

export default function RoundResult() {
  const { myId, room } = useSocket()
  const [countdown, setCountdown] = useState(6)

  useEffect(() => {
    const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  if (!room) return null

  const sorted = [...room.players].sort((a, b) => b.score - a.score)
  const word   = room.currentWord
  const isLast = room.round >= room.totalRounds

  return (
    <div className="min-h-screen graffiti-wall flex items-center justify-center p-4">
      {/* 30px desktop side padding */}
      <div className="relative z-10 w-full max-w-[420px] mx-auto
                      lg:max-w-none lg:w-[calc(100%-60px)] lg:mx-[30px]
                      xl:max-w-[480px] xl:mx-auto space-y-3">

        {/* Header */}
        <div className="text-center">
          <div className="graffiti-title text-4xl text-white">
            ROUND {room.round} DONE!
          </div>
          {word && (() => {
            const cat = getWordCategory(word)
            return (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900
                              border border-zinc-700 rounded-xl mt-2">
                <span className="text-zinc-400 text-xs">The word was:</span>
                <span className="font-black text-amber-400 uppercase tracking-wide">{word}</span>
                <span className="text-[10px] text-zinc-600 capitalize">{cat}</span>
              </div>
            )
          })()}
          <div className={`mt-2 text-xs font-bold ${countdown <= 2 ? 'text-red-400' : 'text-zinc-500'}`}>
            {isLast ? `Game over in ${countdown}s...` : `Next round in ${countdown}s...`}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">
          <div className="px-3 py-2 border-b border-zinc-800 bg-zinc-800/40">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Standings</p>
          </div>
          <div className="divide-y divide-zinc-800">
            {sorted.map((p, rank) => {
              const isMe = p.id === myId
              return (
                <div
                  key={p.id}
                  className={`flex items-center gap-3 px-3 py-3 ${isMe ? 'bg-amber-500/6' : ''} ${rank === 0 ? 'bg-yellow-500/4' : ''}`}
                >
                  <div className="w-6 text-center shrink-0">
                    <span className={`font-black text-sm tabular-nums ${
                      rank === 0 ? 'text-amber-400' : rank === 1 ? 'text-zinc-300' : rank === 2 ? 'text-orange-400' : 'text-zinc-600'
                    }`}>#{rank + 1}</span>
                  </div>

                  {/* Anime avatar */}
                  <div className="shrink-0 w-9 h-9 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700
                                  flex items-center justify-center">
                    <AvatarSVG id={p.avatar ?? 0} size={36} ring={isMe} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold text-sm truncate ${isMe ? 'text-amber-300' : 'text-white'}`}>
                        {p.name}
                      </span>
                      {isMe && (
                        <span className="text-[9px] text-amber-500 font-bold bg-amber-500/10
                                         px-1 py-0.5 rounded border border-amber-500/20">You</span>
                      )}
                    </div>
                    <div className="text-[10px] text-zinc-600 mt-0.5">
                      {getTitle(rank)}{p.hasGuessed && ' · ✓ Guessed!'}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className={`font-black text-base tabular-nums ${rank === 0 ? 'text-amber-400' : 'text-white'}`}>
                      {p.score}
                    </div>
                    <div className="text-[9px] text-zinc-600">pts</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Round progress dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: room.totalRounds }).map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${
              i < room.round ? 'bg-amber-500' : 'bg-zinc-800'
            }`} />
          ))}
        </div>
        <p className="text-center text-zinc-600 text-xs">Round {room.round} of {room.totalRounds}</p>
      </div>
    </div>
  )
}
