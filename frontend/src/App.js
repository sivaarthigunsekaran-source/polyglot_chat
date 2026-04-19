import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import Chat from "./pages/Chat";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Chat />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;