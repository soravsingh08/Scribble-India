import React, { useState, useEffect } from 'react'
import { useSocket } from '../context/SocketContext.jsx'
import AvatarSVG, { AVATAR_LABELS, AVATAR_COUNT } from './AvatarSVG.jsx'

export default function Landing() {
  const {
    myName, myAvatar, setMyName, setMyAvatar,
    createRoom, joinRoom, connected, error, clearError,
  } = useSocket()

  const [tab,         setTab]         = useState('create')
  const [joinCode,    setJoinCode]    = useState('')
  const [maxPlayers,  setMaxPlayers]  = useState(8)
  const [totalRounds, setTotalRounds] = useState(3)
  const [drawTime,    setDrawTime]    = useState(80)
  const [isPrivate,   setIsPrivate]   = useState(false)
  const [nameErr,     setNameErr]     = useState('')
  const [codeErr,     setCodeErr]     = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('join')
    if (code && code.length === 6) { setTab('join'); setJoinCode(code.toUpperCase()) }
  }, [])

  useEffect(() => {
    if (error) { setNameErr(error); clearError() }
  }, [error, clearError])

  function validate() {
    if (!myName.trim() || myName.trim().length < 2) {
      setNameErr('Need at least 2 characters!')
      return false
    }
    setNameErr('')
    return true
  }

  function handleCreate() { if (validate()) createRoom({ isPrivate, maxPlayers, totalRounds, drawTime }) }
  function handleJoin() {
    if (!validate()) return
    if (joinCode.trim().length !== 6) { setCodeErr('Code must be 6 characters!'); return }
    setCodeErr('')
    joinRoom(joinCode.trim().toUpperCase())
  }

  const avatarIds = Array.from({ length: AVATAR_COUNT }, (_, i) => i)

  return (
    <div className="min-h-screen graffiti-wall flex items-center justify-center overflow-y-auto relative">
      {/* 30px padding on desktop sides, none on mobile */}
      <div className="relative z-10 w-full max-w-[420px] mx-auto px-0 sm:px-0 py-4
                      lg:max-w-none lg:w-[calc(100%-60px)] lg:mx-[30px]
                      xl:max-w-[480px] xl:mx-auto">

        {/* ── Logo ── */}
        <div className="text-center mb-5 px-4">
          <div className="inline-flex items-start gap-1 select-none">
            <h1 className="graffiti-title text-6xl text-amber-400 leading-none animate-float">
              SCRIBBLE
            </h1>
            <span
              className="graffiti-title text-xl text-white leading-none mt-1 tracking-[0.18em] opacity-80"
            >
              I&nbsp;N
            </span>
          </div>
          <p className="text-zinc-500 text-[11px] mt-2 tracking-[0.2em] uppercase font-bold">
            Draw · Guess · Win
          </p>
          <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full
                           text-[11px] font-bold border ${
            connected
              ? 'border-emerald-700 bg-emerald-950/60 text-emerald-400'
              : 'border-zinc-700 bg-zinc-900/60 text-zinc-500'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${
              connected ? 'bg-emerald-400 animate-blink' : 'bg-zinc-600'
            }`} />
            {connected ? 'Server connected' : 'Demo mode'}
          </div>
        </div>

        {/* ── Card ── */}
        <div className="bg-zinc-900/95 border border-zinc-700/80 rounded-2xl p-5 shadow-2xl mx-4">

          {/* Nickname */}
          <div className="mb-4">
            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">
              Nickname
            </label>
            <input
              type="text"
              maxLength={16}
              value={myName}
              onChange={e => { setMyName(e.target.value); setNameErr('') }}
              placeholder="Enter your name..."
              autoFocus
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5
                         text-sm text-white placeholder-zinc-600 font-semibold
                         focus:outline-none focus:border-amber-500 transition-colors"
            />
            {nameErr && <p className="text-red-400 text-[11px] mt-1">⚠ {nameErr}</p>}
          </div>

          {/* Avatar picker */}
          <div className="mb-5">
            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
              Avatar
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {avatarIds.map(id => (
                <button
                  key={id}
                  onClick={() => setMyAvatar(id)}
                  title={AVATAR_LABELS[id]}
                  className={`aspect-square rounded-xl flex items-center justify-center
                              transition-all border p-1 ${
                    myAvatar === id
                      ? 'border-amber-500 bg-amber-500/15 scale-105'
                      : 'border-zinc-700 bg-zinc-800/60 hover:border-zinc-500 hover:bg-zinc-700/50'
                  }`}
                >
                  <AvatarSVG id={id} size={38} ring={myAvatar === id} />
                </button>
              ))}
            </div>
            {/* Selected label */}
            <p className="text-center text-amber-400 text-[11px] font-bold mt-1.5">
              {AVATAR_LABELS[myAvatar] ?? 'Choose an avatar'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-zinc-800 rounded-xl p-0.5 mb-4 gap-0.5">
            {['create', 'join'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${
                  tab === t
                    ? 'bg-amber-500 text-black shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {t === 'create' ? 'Create Room' : 'Join Room'}
              </button>
            ))}
          </div>

          {/* Create */}
          {tab === 'create' && (
            <div className="space-y-3 animate-slide-up">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Max Players', value: maxPlayers,  set: setMaxPlayers,  opts: [2,4,6,8,10,12].map(n => ({ v: n, l: `${n} Players` })) },
                  { label: 'Rounds',      value: totalRounds, set: setTotalRounds, opts: [2,3,5,7,10].map(n => ({ v: n, l: `${n} Rounds` })) },
                  { label: 'Draw Time',   value: drawTime,    set: setDrawTime,    opts: [30,45,60,80,100,120].map(n => ({ v: n, l: `${n}s` })) },
                ].map(({ label, value, set, opts }) => (
                  <div key={label}>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
                      {label}
                    </label>
                    <select
                      value={value}
                      onChange={e => set(+e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg
                                 px-2 py-2 text-white text-xs focus:outline-none
                                 focus:border-amber-500 transition-colors"
                    >
                      {opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                    </select>
                  </div>
                ))}

                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
                    Visibility
                  </label>
                  <button
                    onClick={() => setIsPrivate(!isPrivate)}
                    className={`w-full py-2 rounded-lg text-xs font-bold border transition-all ${
                      isPrivate
                        ? 'border-violet-600 bg-violet-950/60 text-violet-300'
                        : 'border-emerald-700 bg-emerald-950/50 text-emerald-300'
                    }`}
                  >
                    {isPrivate ? 'Private' : 'Public'}
                  </button>
                </div>
              </div>

              <button
                onClick={handleCreate}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-black
                           text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-95
                           shadow-lg graffiti-text tracking-widest"
              >
                CREATE ROOM →
              </button>
            </div>
          )}

          {/* Join */}
          {tab === 'join' && (
            <div className="space-y-3 animate-slide-up">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wide mb-1">
                  Room Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={joinCode}
                  onChange={e => { setJoinCode(e.target.value.toUpperCase()); setCodeErr('') }}
                  onKeyDown={e => e.key === 'Enter' && handleJoin()}
                  placeholder="XXXXXX"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-3
                             text-white text-center text-2xl font-black tracking-[0.5em]
                             placeholder-zinc-600 focus:outline-none focus:border-amber-500
                             uppercase transition-colors"
                />
                {codeErr && <p className="text-red-400 text-[11px] mt-1">⚠ {codeErr}</p>}
              </div>
              <button
                onClick={handleJoin}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black
                           text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-95
                           shadow-lg graffiti-text tracking-widest"
              >
                JOIN ROOM →
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-zinc-700 text-[11px] mt-3">
          500+ Indian words · Food · Cricket · Bollywood · Real-time multiplayer
        </p>
      </div>
    </div>
  )
}
