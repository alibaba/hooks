import React, { useRef, useMemo } from 'react';
import { useWebSocket } from 'ahooks';

enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

const Demo: React.FC = () => {
  const messageHistory = useRef<MessageEvent<any>[]>([]);

  const { readyState, latestMessage, sendMessage, disconnect, connect } = useWebSocket(
    'wss://ws.postman-echo.com/raw',
  );

  messageHistory.current = useMemo(
    () => (latestMessage ? messageHistory.current.concat(latestMessage) : messageHistory.current),
    [latestMessage],
  );

  return (
    <div>
      {/* send message */}
      <button
        onClick={() => sendMessage?.(`${Date.now()}`)}
        disabled={readyState !== ReadyState.Open}
        style={{ marginRight: 8 }}
      >
        ✉️ send
      </button>
      {/* disconnect */}
      <button
        onClick={() => disconnect?.()}
        disabled={readyState !== ReadyState.Open}
        style={{ marginRight: 8 }}
      >
        ❌ disconnect
      </button>
      {/* connect */}
      <button onClick={() => connect?.()} disabled={readyState === ReadyState.Open}>
        {readyState === ReadyState.Connecting ? 'connecting' : '📞 connect'}
      </button>
      <div style={{ marginTop: 8 }}>readyState: {readyState}</div>
      <div style={{ marginTop: 8 }}>
        <p>received message: </p>
        {messageHistory.current.map((message, index) => (
          <p key={index} style={{ wordWrap: 'break-word' }}>
            {message?.data}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Demo;
