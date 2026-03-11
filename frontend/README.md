# 🎨 Scribble India

> Real-time multiplayer draw & guess game with 500+ Indian words.
> Built with React + Vite + Socket.io + MongoDB

---

## 📁 Folder Structure

```
scribble-india/
│
├── 📁 src/                        ← Frontend (React + Vite)
│   ├── components/
│   │   ├── Landing.jsx            → Home screen (Create/Join)
│   │   ├── Lobby.jsx              → Waiting room + room code
│   │   ├── WordSelect.jsx         → Drawer picks 1 of 3 words
│   │   ├── DrawingGame.jsx        → Main canvas + chat + timer
│   │   ├── RoundResult.jsx        → After-round leaderboard
│   │   ├── GameOver.jsx           → Final standings
│   │   └── AvatarSVG.jsx          → Anime-style SVG avatars
│   ├── context/
│   │   └── SocketContext.jsx      → Socket.io client + game state
│   ├── hooks/
│   │   └── useCanvas.js           → HTML5 Canvas drawing hook
│   ├── data/
│   │   └── words.js               → 500+ Indian words + fuzzy match
│   ├── App.jsx
│   └── index.css
│
├── 📁 server/                     ← Backend (Node.js + Express)
│   │
│   ├── 📁 config/                 ← LAYER 1: Configuration
│   │   ├── db.js                  → MongoDB connection
│   │   └── env.js                 → All env variables
│   │
│   ├── 📁 models/                 ← LAYER 2: MongoDB Models
│   │   ├── GameRoom.js            → Completed game sessions
│   │   └── PlayerStats.js        → Lifetime player stats
│   │
│   ├── 📁 services/               ← LAYER 3: Business Logic
│   │   ├── wordService.js         → 500+ words, fuzzy match, hints
│   │   ├── gameService.js         → Room/player management (pure)
│   │   └── dbService.js           → Save/read from MongoDB
│   │
│   ├── 📁 socket/                 ← LAYER 4: Socket Handlers
│   │   └── gameHandler.js         → All socket.io event handlers
│   │
│   ├── server.js                  → Main entry point
│   ├── .env                       → Your secrets (never commit!)
│   └── package.json
│
├── .env                           → Frontend env (VITE_BACKEND_URL)
├── .gitignore
├── package.json
└── vite.config.ts
```

---

## ⚡ VS Code Setup — Step by Step

### Step 1 — Check Node.js is Installed

Open VS Code terminal (`Ctrl + `` `) and run:
```bash
node --version
# Should show v16.x.x or higher

npm --version
# Should show 8.x.x or higher
```

If not installed → Download from https://nodejs.org (choose LTS)

---

### Step 2 — Open Project in VS Code

```
File → Open Folder → select the scribble-india folder
```

---

### Step 3 — Open TWO Terminals

In VS Code:
1. Press `Ctrl + `` ` to open terminal
2. Click the **+** button to open a second terminal
3. You now have Terminal 1 and Terminal 2

---

### Step 4 — Install & Start Backend (Terminal 1)

```bash
# Navigate to server folder
cd server

# Install all dependencies
npm install

# Start the server
node server.js
```

✅ You should see:
```
  ✅  MongoDB connected: practice-cluster.btpauyj.mongodb.net
  ╔══════════════════════════════════════════════╗
  ║   🎨  Scribble India — Server Ready!         ║
  ║   http://localhost:3001                       ║
  ║   500+ Indian words loaded ✅                ║
  ║   MongoDB persistence ✅                     ║
  ╚══════════════════════════════════════════════╝
```

---

### Step 5 — Install & Start Frontend (Terminal 2)

```bash
# Make sure you're in the ROOT folder (not server/)
# If you're in server/, go back:
cd ..

# Install frontend dependencies
npm install

# Start frontend dev server
npm run dev
```

✅ You should see:
```
  VITE v5.x.x  ready in 500ms
  ➜  Local:   http://localhost:5173/
```

---

### Step 6 — Test Multiplayer

| Browser Window | What to Do |
|---------------|-----------|
| **Chrome** (normal) | Open `http://localhost:5173` → Enter name → Click **Create Room** → Copy the 6-digit code |
| **Chrome Incognito** (`Ctrl+Shift+N`) | Open `http://localhost:5173` → Enter name → Click **Join Room** → Paste the code |
| **Back to Chrome** | You are HOST → Click **🚀 START GAME** |

---

### Step 7 — Check MongoDB Data

Open your MongoDB Atlas dashboard:
1. Go to https://cloud.mongodb.com
2. Click your cluster → Browse Collections
3. Database: `scribble_india`
4. Collections: `gamerooms`, `playerstats`

After a completed game, you'll see data saved there!

---

## 🔍 Check if Everything is Working

### Backend health check:
Open in browser: http://localhost:3001
```json
{
  "status": "ok",
  "app": "Scribble India",
  "activeRooms": 1,
  "activePlayers": 2
}
```

### Available API endpoints:
| Endpoint | What it shows |
|----------|--------------|
| `GET /` | Server health + active rooms count |
| `GET /api/rooms` | All public lobby rooms |
| `GET /api/leaderboard` | Top 10 players (from MongoDB) |
| `GET /api/room/:code` | Info about a specific room |
| `GET /api/games/recent` | Last 5 completed games |

---

## 🚀 Deploy to Production

### Option 1 — Render.com (Free, Recommended)

**Backend:**
1. Go to https://render.com → New → Web Service
2. Connect your GitHub repo
3. Root Directory: `server`
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add Environment Variables:
   - `MONGO_URI` = your MongoDB connection string
   - `CLIENT_URL` = your frontend URL (e.g., https://scribble-india.vercel.app)
   - `NODE_ENV` = production

**Frontend:**
1. Go to https://vercel.com → New Project
2. Import your GitHub repo
3. Framework: Vite
4. Add Environment Variable:
   - `VITE_BACKEND_URL` = your Render backend URL

---

### Option 2 — Railway.app (Easy)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd server
railway init
railway up

# Add env vars in Railway dashboard
```

---

### Option 3 — VPS (DigitalOcean/AWS)

```bash
# On your server
git clone your-repo
cd scribble-india/server
npm install
npm install -g pm2

# Start with PM2 (keeps running after terminal closes)
pm2 start server.js --name scribble-india
pm2 save
pm2 startup

# Frontend — build and serve
cd ..
npm install
npm run build
# Serve dist/ with nginx
```

---

## 🎮 How to Play

1. **Create Room** → Share the 6-digit code with friends
2. **Everyone Joins** → Pick your anime avatar + enter name
3. **Host Starts** → Click START GAME (min 2 players)
4. **Drawer picks** a word from 3 Indian word choices (15s)
5. **Others guess** in chat — fuzzy matching works (gol gappa = pani puri ✅)
6. **Points** → faster guess = more points
7. **3 Rounds** → Final leaderboard with titles!

---

## ⚙️ Common Issues & Fixes

### "Room not found" error
- Make sure backend is running on port 3001
- Check `src/.env` has `VITE_BACKEND_URL=http://localhost:3001`

### MongoDB connection fails
- Game STILL WORKS — just no data persistence
- Check your MongoDB Atlas → Network Access → Add `0.0.0.0/0`
- Verify MONGO_URI in `server/.env`

### "Need at least 2 players"
- Open a second browser window (incognito) and join the room

### Port already in use
```bash
# Find and kill the process
npx kill-port 3001
npx kill-port 5173
```

### nodemon not found
```bash
npm install -g nodemon
# Then use: nodemon server.js
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Real-time | Socket.io 4.x |
| Database | MongoDB Atlas + Mongoose |
| Drawing | HTML5 Canvas API |
| State | React Context API |
| Avatars | Inline SVG (no images!) |
| Fonts | Bangers (Google Fonts) |

---

Made with ❤️ for Scribble India
