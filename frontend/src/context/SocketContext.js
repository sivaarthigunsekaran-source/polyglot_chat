import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const { user } = useAuth();
  const socketRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!user) return;

    socketRef.current = io(process.env.REACT_APP_SERVER_URL || 'http://localhost:5000');

    socketRef.current.on('connect', () => {
      setConnected(true);
      socketRef.current.emit('user_join', user.id);
    });

    socketRef.current.on('disconnect', () => setConnected(false));

    socketRef.current.on('users_list', (users) => {
      setOnlineUsers(users.filter(u => u._id !== user.id || u.username !== user.username));
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers, connected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
