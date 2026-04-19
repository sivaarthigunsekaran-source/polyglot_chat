# 🌐 Polyglot Chat
### Real-Time Multilingual Messaging — 100% Free to Run

> **Polyglot Chat** lets users speaking different languages message, call, and video chat in real time. Messages are automatically translated between any two languages using free AI APIs.

---

## ✨ Features

| Feature | Details |
|---|---|
| 💬 Real-time chat | Instant messaging via Socket.IO |
| 🌍 Auto translation | Messages auto-translated to recipient's language |
| 🎤 Voice messages | Record & send audio with live transcription |
| 📝 Live captions | Real-time subtitles during voice/video calls |
| 📹 Video calls | Peer-to-peer video via WebRTC |
| 🌐 12 languages | EN, TA, HI, FR, ES, DE, JA, ZH, AR, PT, KO, RU |
| 🟢 Presence | Online/offline status + typing indicators |
| 🔐 Auth | JWT-based login/signup |
| 🔇 Toggle translate | View original or translated text on any message |

---

## 🆓 Free Tools Used (Zero Cost)

| Component | Free Service | Limit |
|---|---|---|
| Translation | [MyMemory API](https://mymemory.translated.net/) | 1,000 req/day — no signup |
| AI Translation | [Gemini 1.5 Flash](https://aistudio.google.com/apikey) | 1,500 req/day free |
| Database | [MongoDB Atlas](https://cloud.mongodb.com) | 512 MB free forever |
| Speech Recognition | Browser Web Speech API | Free, built-in |
| Video Calls | WebRTC (SimplePeer) | Free, peer-to-peer |
| Backend Hosting | [Render.com](https://render.com) free tier | Free |
| Frontend Hosting | [Vercel](https://vercel.com) free tier | Free |

---

## 🚀 Quick Start (Local)

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or above
- A free [MongoDB Atlas](https://cloud.mongodb.com) account

---

### Step 1 — Get your MongoDB URI

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → Sign up free
2. Create a free **M0** cluster (any region)
3. Under **Database Access** → Add a user with a password
4. Under **Network Access** → Allow `0.0.0.0/0`
5. Click **Connect** → **Drivers** → Copy the connection string
6. It looks like: `mongodb+srv://youruser:yourpass@cluster0.abc.mongodb.net/`

---

### Step 2 — (Optional) Get Gemini API Key for Better Translation

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with Google → Create API Key → Copy it
3. Paste it in `backend/.env` as `GEMINI_API_KEY=your_key_here`
4. Without this key, MyMemory API is used automatically (still free!)

---

### Step 3 — Run the Backend

```bash
cd backend

# Install dependencies
npm install

# Edit .env with your MongoDB URI (and optionally Gemini key)
# Open backend/.env and paste your MONGODB_URI

# Start the server
npm run dev
```

Server starts at **http://localhost:5000**

---

### Step 4 — Run the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the React app
npm start
```

Frontend opens at **http://localhost:3000**

---

### Step 5 — Test It

1. Open **two browser tabs** (or two different browsers)
2. Sign up as two different users — pick different languages (e.g. English & Tamil)
3. Start chatting — messages auto-translate in real time!
4. Try voice messages, video calls, and live captions

---

## 📁 Project Structure

```
polyglot-chat/
├── backend/
│   ├── server.js          # Express + Socket.IO + MongoDB
│   ├── package.json
│   ├── .env               # Your config (MongoDB URI, keys)
│   └── .env.example       # Template
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js
    │   ├── index.js
    │   ├── index.css
    │   ├── context/
    │   │   ├── AuthContext.js     # Login/signup state
    │   │   └── SocketContext.js   # Socket.IO connection
    │   ├── pages/
    │   │   ├── Auth.js + .css     # Login/signup page
    │   │   └── Chat.js + .css     # Main chat page
    │   └── components/
    │       ├── UserList.js + .css     # Sidebar user list
    │       ├── MessageArea.js + .css  # Message bubbles
    │       └── VideoCall.js + .css    # WebRTC video call
    ├── package.json
    └── .env
```

---

## 🌐 Deploy for Free Online

### Backend → Render.com
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo → Select `backend/` as root
4. Build command: `npm install`
5. Start command: `npm start`
6. Add Environment Variables (copy from `.env`)

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo → Set root to `frontend/`
3. Add env variable: `REACT_APP_SERVER_URL=https://your-render-url.onrender.com`
4. Deploy!

---

## 🛠 Tech Stack

**Backend:** Node.js, Express, Socket.IO, MongoDB, Mongoose, JWT, Multer  
**Frontend:** React 18, Socket.IO Client, SimplePeer (WebRTC), Axios  
**Translation:** MyMemory Free API + Google Gemini 1.5 Flash (free tier)  
**Speech:** Web Speech API (browser built-in)  
**Styling:** Custom CSS with Google Fonts (Syne + DM Sans)

---

## 📝 Project Info

**Title:** Polyglot Chat: Real-Time Multilingual Messaging Using Large Language Models  
**Team:** NIVETHA D, SIVAARTHI G, PARAMESWARI T  
**Institution:** Vel Tech High Tech Dr. Rangarajan Dr. Sakunthala Engineering College  
**Department:** Information Technology | Semester V | November 2025
