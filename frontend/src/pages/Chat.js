import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

function Chat() {
  const { socket } = useSocket();

  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (!socket) return;

    console.log("🟢 Socket connected");

    socket.on("receiveMessage", (data) => {
      console.log("Message received in frontend:", data);
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  const sendMessage = () => {
    if (!msg.trim()) return;

    console.log("Sending message:", msg);

    socket.emit("sendMessage", {
      text: msg,
      sender: "User"
    });

    setMsg("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat 🌐</h2>

      <div style={{ height: 300, overflowY: "auto", border: "1px solid #ccc", padding: 10 }}>
        {chat.map((c, i) => (
          <p key={i}>
            <b>{c.sender}:</b> {c.text}
          </p>
        ))}
      </div>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;