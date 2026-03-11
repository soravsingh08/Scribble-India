import React, { useEffect, useState } from 'react'
import { useSocket } from '../context/SocketContext.jsx'
import AvatarSVG from './AvatarSVG.jsx'
import { getWordCategory } from '../data/words.js'

const CATEGORY_STYLES = {
  food:       { label: 'Food',       color: 'text-orange-400  border-orange-800  bg-orange-950/50' },
  bollywood:  { label: 'Bollywood',  color: 'text-pink-400    border-pink-800    bg-pink-950/50'   },
  cricket:    { label: 'Cricket',    color: 'text-blue-400    border-blue-800    bg-blue-950/50'   },
  places:     { label: 'Places',     color: 'text-emerald-400 border-emerald-800 bg-emerald-950/50'},
  household:  { label: 'Household',  color: 'text-yellow-400  border-yellow-800  bg-yellow-950/50' },
  transport:  { label: 'Transport',  color: 'text-cyan-400    border-cyan-800    bg-cyan-950/50'   },
  festivals:  { label: 'Festivals',  color: 'text-violet-400  border-violet-800  bg-violet-950/50' },
  nature:     { label: 'Nature',     color: 'text-green-400   border-green-800   bg-green-950/50'  },
  people:     { label: 'People',     color: 'text-amber-400   border-amber-800   bg-amber-950/50'  },
  modern:     { label: 'Modern',     color: 'text-indigo-400  border-indigo-800  bg-indigo-950/50' },
  education:  { label: 'Education',  color: 'text-teal-400    border-teal-800    bg-teal-950/50'   },
  general:    { label: 'General',    color: 'text-zinc-400    border-zinc-700    bg-zinc-800/50'   },
}

export default function WordSelect() {
  const { room, myId, selectWord } = useSocket()
  const [countdown, setCountdown] = useState(15)
  const [selected,  setSelected]  = useState(null)

  const isDrawer = room?.currentDrawerId === myId

  useEffect(() => {
    if (!isDrawer) return
    const iv = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(iv)
          if (room?.wordChoices?.length && !selected) {
            const raw  = room.wordChoices[0]
            let word   = ''
            if (typeof raw === 'string')        word = raw
            else if (raw && raw.word)           word = String(raw.word)
            else if (raw != null)               word = String(raw)
            word = word.trim()
            if (word) { setSelected(word); selectWord(word) }
          }
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(iv)
  }, [isDrawer]) // eslint-disable-line

  if (!room) return null

  const drawer = room.players.find(p => p.id === room.currentDrawerId)

  function handleSelect(rawWord) {
    if (!isDrawer || selected) return
    const word = typeof rawWord === 'string'
      ? rawWord
      : (rawWord && typeof rawWord === 'object' && rawWord.word)
        ? String(rawWord.word)
        : String(rawWord ?? '')
    if (!word) return
    setSelected(word)
    selectWord(word)
  }

  return (
    <div className="min-h-screen graffiti-wall relative flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-[420px] mx-auto text-center space-y-4
                      lg:max-w-none lg:w-[calc(100%-60px)] lg:mx-[30px]
                      xl:max-w-[480px] xl:mx-auto">

        {/* Round badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/90 border border-zinc-700
                        rounded-full text-xs font-bold text-zinc-400">
          <span className="text-amber-400">Round {room.round}</span>
          <span className="text-zinc-600">/</span>
          <span>{room.totalRounds}</span>
        </div>

        {isDrawer ? (
          <>
            {/* Drawer picks word */}
            <div>
              <h2 className="graffiti-title text-4xl text-white">CHOOSE A WORD</h2>
              <p className="text-zinc-500 text-sm mt-1">
                Auto-picks in{' '}
                <span className={`font-black ${countdown <= 5 ? 'text-red-400' : 'text-amber-400'}`}>
                  {countdown}s
                </span>
              </p>
            </div>

            <div className="space-y-2">
              {(room.wordChoices || []).map((rawWord, i) => {
                // Triple-safe string extraction
                let word = ''
                if (typeof rawWord === 'string')         word = rawWord
                else if (rawWord && rawWord.word)        word = String(rawWord.word)
                else if (rawWord !== null && rawWord !== undefined) word = String(rawWord)
                word = word.trim()
                if (!word) return null // skip empty

                const cat = getWordCategory(word)
                const catInfo = CATEGORY_STYLES[cat] || CATEGORY_STYLES.general
                return (
                  <button
                    key={`word-${i}-${word}`}
                    onClick={() => handleSelect(word)}
                    disabled={!!selected}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 font-bold
                      text-left transition-all ${
                      selected === word
                        ? 'border-amber-500 bg-amber-500/15 text-amber-300'
                        : selected
                        ? 'border-zinc-800 bg-zinc-900/70 text-zinc-600 opacity-40'
                        : 'border-zinc-700 bg-zinc-900/90 text-white hover:border-amber-500/60 hover:bg-zinc-800 active:scale-[0.98]'
                    }`}
                  >
                    <span className="text-zinc-500 font-black text-sm shrink-0 w-5 text-center">
                      {['A','B','C'][i]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-black capitalize">{word}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                                          text-[10px] font-bold border ${catInfo.color}`}>
                          {catInfo.label}
                        </span>
                        <span className="text-[10px] text-zinc-600">
                          {word.split('').filter(c => c !== ' ').length} letters
                          {word.includes(' ') ? ` · ${word.split(' ').length} words` : ''}
                        </span>
                      </div>
                    </div>
                    {selected === word && (
                      <span className="text-amber-400 shrink-0 text-lg">✓</span>
                    )}
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          /* Others wait */
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700
                            flex items-center justify-center animate-pop-in">
              <AvatarSVG id={drawer?.avatar ?? 0} size={80} />
            </div>
            <div>
              <h2 className="graffiti-title text-4xl text-white">
                {drawer?.name || 'Someone'}
              </h2>
              <p className="text-zinc-400 text-sm mt-1.5">is picking a word...</p>
            </div>

            {/* Animated dots */}
            <div className="flex justify-center gap-2 mt-2">
              {[0,1,2].map(i => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-amber-500"
                  style={{ animation: `bounce-dot 0.8s ${i * 0.18}s ease-in-out infinite alternate` }}
                />
              ))}
            </div>
            <style>{`
              @keyframes bounce-dot {
                from { transform: translateY(0);     opacity: 0.35; }
                to   { transform: translateY(-10px); opacity: 1; }
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  )
}
