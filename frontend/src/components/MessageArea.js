import React, { useState } from 'react';
import './MessageArea.css';

export default function MessageArea({ messages, currentUser, messagesEndRef }) {
  return (
    <div className="message-area">
      {messages.length === 0 && (
        <div className="msg-empty">
          <span>💬</span>
          <p>No messages yet. Say hello!</p>
        </div>
      )}
      {messages.map((msg, i) => (
        <MessageBubble key={msg.id || msg._id || i} msg={msg} currentUser={currentUser} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

function MessageBubble({ msg, currentUser }) {
  const isMine = msg.senderId === currentUser.id || msg.senderId?.toString() === currentUser.id;
  const [showOriginal, setShowOriginal] = useState(false);

  const timeStr = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const displayText = isMine ? msg.originalText : (showOriginal ? msg.originalText : msg.translatedText);
  const hasTranslation = msg.originalText !== msg.translatedText;

  return (
    <div className={`msg-wrap ${isMine ? 'mine' : 'theirs'}`}>
      <div className={`msg-bubble ${isMine ? 'mine' : 'theirs'}`}>
        {msg.messageType === 'audio' ? (
          <div className="msg-audio">
            <span>🎤</span>
            <audio controls src={msg.audioUrl} />
            <div className="msg-audio-transcript">
              {displayText}
            </div>
          </div>
        ) : (
          <div className="msg-text">{displayText}</div>
        )}

        <div className="msg-meta">
          <span className="msg-time">{timeStr}</span>
          {!isMine && hasTranslation && (
            <button
              className="msg-translate-toggle"
              onClick={() => setShowOriginal(!showOriginal)}
            >
              {showOriginal ? '🔄 Show translated' : '👁 Show original'}
            </button>
          )}
          {!isMine && hasTranslation && (
            <span className="msg-translated-badge">🌐 translated</span>
          )}
        </div>
      </div>
    </div>
  );
}
