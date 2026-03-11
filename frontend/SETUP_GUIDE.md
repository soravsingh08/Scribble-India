# Scribble India — Complete Setup & Deploy Guide

## FOLDER STRUCTURE
```
scribble-india/          ← ROOT (frontend)
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Landing.jsx
│   │   ├── Lobby.jsx
│   │   ├── WordSelect.jsx
│   │   ├── DrawingGame.jsx
│   │   ├── RoundResult.jsx
│   │   ├── GameOver.jsx
│   │   └── AvatarSVG.jsx
│   ├── context/
│   │   └── SocketContext.jsx
│   ├── hooks/
│   │   └── useCanvas.js
│   └── data/
│       └── words.js
├── server/              ← BACKEND (Node.js)
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   ├── models/
│   │   ├── GameRoom.js
│   │   └── PlayerStats.js
│   ├── services/
│   │   ├── wordService.js
│   │   ├── gameService.js
│   │   └── dbService.js
│   └── socket/
│       └── gameHandler.js
├── .env                 ← Frontend env (VITE_BACKEND_URL)
├── package.json
└── vite.config.ts
```
