import React from 'react'
import { useSocket } from '../context/SocketContext.jsx'
import AvatarSVG from './AvatarSVG.jsx'

const TITLES = [
  { min: 0,   badge: '🐣', label: 'Naya Seekhne Wala',   color: 'text-zinc-400'   },
  { min: 50,  badge: '✏️', label: 'Timepass Artist',     color: 'text-sky-400'    },
  { min: 150, badge: '🎨', label: 'Jugaadu Guesser',      color: 'text-indigo-400' },
  { min: 300, badge: '⭐', label: 'Pro Drawer',           color: 'text-amber-400'  },
  { min: 500, badge: '🏆', label: 'Scribble India Legend',color: 'text-yellow-400' },
]

function getTitle(score) {
  for (let i = TITLES.length - 1; i >= 0; i--) {
    if (score >= TITLES[i].min) return TITLES[i]
  }
  return TITLES[0]
}

export default function GameOver() {
  const { myId, room, leaveRoom } = useSocket()
  if (!room) return null

  const sorted  = [...room.players].sort((a, b) => b.score - a.score)
  const winner  = sorted[0]
  const isIWon  = winner?.id === myId
  const myRank  = sorted.findIndex(p => p.id === myId)

  return (
    <div className="min-h-screen graffiti-wall relative flex items-center justify-center p-4 overflow-y-auto">
      {/* 30px desktop side padding */}
      <div className="relative z-10 w-full max-w-[420px] mx-auto
                      lg:max-w-none lg:w-[calc(100%-60px)] lg:mx-[30px]
                      xl:max-w-[480px] xl:mx-auto space-y-4">

        {/* Header */}
        <div className="text-center">
          <div className="graffiti-title text-5xl text-white leading-none">GAME OVER</div>
          <div className="graffiti-title text-2xl text-amber-500 leading-none">SCRIBBLE INDIA</div>

          {winner && (
            <div className="inline-flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border-2
                            bg-amber-500/8 border-amber-600/40 mt-4">
              {/* Big winner avatar */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-800 border-2 border-amber-500/50
                              flex items-center justify-center animate-pop-in shadow-lg">
                <AvatarSVG id={winner.avatar ?? 0} size={80} ring />
              </div>
              <div className="font-black text-xl text-amber-300">{winner.name}</div>
              <div className="text-amber-500/80 text-xs font-bold">{isIWon ? '🎉 You won!' : '👑 Winner!'}</div>
              <div className="graffiti-title text-3xl text-amber-400">{winner.score} pts</div>
            </div>
          )}
        </div>

        {/* Final Leaderboard */}
        <div className="bg-zinc-900/95 border border-zinc-700 rounded-2xl overflow-hidden">
          <div className="px-3 py-2 bg-zinc-800/40 border-b border-zinc-800">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Final Standings</p>
          </div>
          <div className="divide-y divide-zinc-800/60">
            {sorted.map((p, rank) => {
              const isMe  = p.id === myId
              const title = getTitle(p.score)
              return (
                <div
                  key={p.id}
                  className={`flex items-center gap-3 px-3 py-3 ${
                    isMe ? 'bg-amber-500/6 border-l-2 border-amber-500' : ''
                  } ${rank === 0 ? 'bg-yellow-500/4' : ''}`}
                >
                  <div className="w-6 text-center shrink-0 text-base">
                    {rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉'
                      : <span className="text-zinc-600 font-black text-xs">{rank + 1}</span>}
                  </div>

                  {/* Anime avatar — bigger on game over screen */}
                  <div className="shrink-0 w-11 h-11 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700
                                  flex items-center justify-center">
                    <AvatarSVG id={p.avatar ?? 0} size={44} ring={isMe} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`font-black text-sm ${isMe ? 'text-amber-300' : 'text-white'}`}>
                        {p.name}
                      </span>
                      {isMe && (
                        <span className="text-[9px] bg-amber-500/10 text-amber-400
                                         border border-amber-600/30 px-1 py-0.5 rounded font-bold">
                          You
                        </span>
                      )}
                    </div>
                    <div className={`text-xs mt-0.5 font-bold ${title.color}`}>
                      {title.badge} {title.label}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className={`font-black text-lg tabular-nums ${rank === 0 ? 'text-amber-400' : 'text-white'}`}>
                      {p.score}
                    </div>
                    <div className="text-[9px] text-zinc-600">pts</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* My result banner */}
        {myRank >= 0 && (
          <div className={`text-center px-3 py-2.5 rounded-xl border text-sm font-bold ${
            myRank === 0
              ? 'border-amber-600/40 bg-amber-500/8 text-amber-300'
              : myRank <= 2
              ? 'border-sky-600/30 bg-sky-500/6 text-sky-300'
              : 'border-zinc-700 bg-zinc-900/60 text-zinc-400'
          }`}>
            {myRank === 0 ? '🏆 Champion! Amazing performance!'
              : myRank === 1 ? '🥈 So close! 2nd place!'
              : myRank === 2 ? '🥉 Solid 3rd place!'
              : `Finished #${myRank + 1} — try again!`}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={leaveRoom}
            className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-black
                       text-sm rounded-xl border border-zinc-700 transition-all active:scale-95"
          >
            🏠 Home
          </button>
          <button
            onClick={leaveRoom}
            className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black
                       text-sm rounded-xl transition-all active:scale-95 graffiti-text tracking-widest"
          >
            PLAY AGAIN →
          </button>
        </div>

      </div>
    </div>
  )
}
