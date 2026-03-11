import React from 'react'
import { SocketProvider, useSocket } from './context/SocketContext.jsx'
import Landing     from './components/Landing.jsx'
import Lobby       from './components/Lobby.jsx'
import WordSelect  from './components/WordSelect.jsx'
import DrawingGame from './components/DrawingGame.jsx'
import RoundResult from './components/RoundResult.jsx'
import GameOver    from './components/GameOver.jsx'

function AppRouter() {
  const { phase } = useSocket()

  switch (phase) {
    case 'landing':      return <Landing />
    case 'lobby':        return <Lobby />
    case 'word-select':  return <WordSelect />
    case 'drawing':      return <DrawingGame />
    case 'round-result': return <RoundResult />
    case 'game-over':    return <GameOver />
    default:             return <Landing />
  }
}

export default function App() {
  return (
    <SocketProvider>
      <AppRouter />
    </SocketProvider>
  )
}
