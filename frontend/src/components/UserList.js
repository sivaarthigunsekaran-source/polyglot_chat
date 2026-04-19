import React, { useState } from 'react';
import './UserList.css';

const LANG_FLAGS = {
  en: '🇺🇸', ta: '🇮🇳', hi: '🇮🇳', fr: '🇫🇷', es: '🇪🇸',
  de: '🇩🇪', ja: '🇯🇵', zh: '🇨🇳', ar: '🇸🇦', pt: '🇧🇷',
  ko: '🇰🇷', ru: '🇷🇺'
};

export default function UserList({ users, selectedUser, onSelect }) {
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  const online = filtered.filter(u => u.online);
  const offline = filtered.filter(u => !u.online);

  return (
    <div className="userlist">
      <div className="userlist-search">
        <input
          placeholder="🔍 Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="userlist-scroll">
        {online.length > 0 && (
          <>
            <div className="userlist-section-label">🟢 Online ({online.length})</div>
            {online.map(u => (
              <UserRow key={u._id} user={u} selected={selectedUser?._id === u._id} onSelect={onSelect} />
            ))}
          </>
        )}
        {offline.length > 0 && (
          <>
            <div className="userlist-section-label">⚫ Offline ({offline.length})</div>
            {offline.map(u => (
              <UserRow key={u._id} user={u} selected={selectedUser?._id === u._id} onSelect={onSelect} />
            ))}
          </>
        )}
        {filtered.length === 0 && (
          <div className="userlist-empty">No users found</div>
        )}
      </div>
    </div>
  );
}

function UserRow({ user, selected, onSelect }) {
  return (
    <button
      className={`user-row ${selected ? 'selected' : ''} ${user.online ? 'online' : ''}`}
      onClick={() => onSelect(user)}
    >
      <div className="user-row-avatar">
        {user.username[0].toUpperCase()}
        <span className={`user-row-dot ${user.online ? 'on' : 'off'}`} />
      </div>
      <div className="user-row-info">
        <div className="user-row-name">{user.username}</div>
        <div className="user-row-lang">
          {LANG_FLAGS[user.language] || '🌐'} {user.language?.toUpperCase()}
          {user.inCall && <span className="in-call-badge">📞 In call</span>}
        </div>
      </div>
    </button>
  );
}
