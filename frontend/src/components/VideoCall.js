import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import './VideoCall.css';

export default function VideoCall({ socket, call, user, onEnd, liveCaption }) {
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callStatus, setCallStatus] = useState('connecting');
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const myVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: call.isVideo, audio: true })
      .then(localStream => {
        setStream(localStream);
        if (myVideoRef.current) myVideoRef.current.srcObject = localStream;

        const peer = new Peer({
          initiator: call.isInitiator,
          trickle: false,
          stream: localStream
        });

        peer.on('signal', (signalData) => {
          if (call.isInitiator) {
            socket.emit('call_user', {
              from: user.id,
              to: call.userId,
              signal: signalData,
              callerName: user.username
            });
          } else {
            socket.emit('accept_call', { to: call.userId, signal: signalData });
          }
        });

        peer.on('stream', (remote) => {
          setRemoteStream(remote);
          setCallStatus('connected');
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remote;
        });

        peer.on('error', (err) => {
          console.error('Peer error:', err);
          setCallStatus('error');
        });

        if (!call.isInitiator && call.signal) {
          peer.signal(call.signal);
        }

        peerRef.current = peer;

        if (call.isInitiator) {
          socket.on('call_accepted', ({ signal }) => {
            peer.signal(signal);
            setCallStatus('connected');
          });
        }
      })
      .catch(err => {
        console.error('Media error:', err);
        setCallStatus('error');
      });

    return () => {
      peerRef.current?.destroy();
      stream?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach(t => (t.enabled = muted));
      setMuted(!muted);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(t => (t.enabled = videoOff));
      setVideoOff(!videoOff);
    }
  };

  return (
    <div className="video-call-overlay">
      <div className="video-call-container">
        {/* Header */}
        <div className="video-header">
          <span className={`call-status-dot ${callStatus}`} />
          <span className="video-header-name">
            {callStatus === 'connected' ? `📞 ${call.username}` : `Calling ${call.username}...`}
          </span>
        </div>

        {/* Videos */}
        <div className="video-grid">
          <div className="video-remote">
            {remoteStream ? (
              <video ref={remoteVideoRef} autoPlay playsInline className="video-el" />
            ) : (
              <div className="video-placeholder">
                <div className="video-spinner" />
                <span>Connecting...</span>
              </div>
            )}
            {liveCaption && (
              <div className="video-caption">{liveCaption}</div>
            )}
          </div>

          <div className="video-local">
            <video ref={myVideoRef} autoPlay muted playsInline className="video-el" />
            {videoOff && <div className="video-off-overlay">📷 Off</div>}
          </div>
        </div>

        {/* Controls */}
        <div className="video-controls">
          <button
            className={`vc-btn ${muted ? 'active-red' : ''}`}
            onClick={toggleMute}
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? '🔇' : '🎤'}
          </button>
          {call.isVideo && (
            <button
              className={`vc-btn ${videoOff ? 'active-red' : ''}`}
              onClick={toggleVideo}
              title={videoOff ? 'Turn video on' : 'Turn video off'}
            >
              {videoOff ? '📵' : '📹'}
            </button>
          )}
          <button className="vc-btn end" onClick={onEnd} title="End call">📵</button>
        </div>
      </div>
    </div>
  );
}
