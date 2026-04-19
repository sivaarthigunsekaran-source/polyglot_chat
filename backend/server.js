require("dotenv").config();

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const { Server } = require("socket.io");

// Models
const User = require("./models/User");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);

// ================= SOCKET.IO =================
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Create uploads folder if not exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ================= MONGODB =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });

// ================= SOCKET EVENTS =================
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // RECEIVE MESSAGE FROM FRONTEND
  socket.on("sendMessage", async (data) => {
    try {
      console.log("Message received:", data);

      const msg = new Message({
        text: data.text,
        sender: data.sender,
        createdAt: new Date()
      });

      const savedMsg = await msg.save();

      // SEND TO ALL CLIENTS
      io.emit("receiveMessage", savedMsg);

    } catch (err) {
      console.log("Error saving message:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ================= ROUTES =================
app.get("/", (req, res) => {
  res.send("Server working 🚀");
});

app.get("/test", (req, res) => {
  res.send("Test API working ✅");
});

// Create user
app.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User saved successfully ✅");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Save message (REST optional)
app.post("/message", async (req, res) => {
  try {
    const msg = new Message(req.body);
    await msg.save();
    res.send("Message saved ✅");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get messages
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});