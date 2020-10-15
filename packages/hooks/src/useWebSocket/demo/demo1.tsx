/**
 * title: Default usage
 * desc: WebSocket hooks used.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: webSocket hooks 使用
 */

import React, { useRef, useMemo } from 'react';
import { useWebSocket } from 'ahooks';

enum READY_STATE {
  connecting = 0,
  open = 1,
  closing = 2,
  closed = 3,
}

export default () => {
  const messageHistory = useRef([]);

  const { readyState, sendMessage, latestMessage, disconnect, connect } = useWebSocket(
    'wss://echo.websocket.org',
  );

  messageHistory.current = useMemo(() => messageHistory.current.concat(latestMessage), [
    latestMessage,
  ]);

  return (
    <div>
      {/* send message */}
      <button
        onClick={() => sendMessage && sendMessage(`${Date.now()}`)}
        disabled={readyState !== READY_STATE.open}
        style={{ marginRight: 12 }}
      >
        ✉️ send
      </button>
      {/* disconnect */}
      <button
        onClick={() => disconnect && disconnect()}
        disabled={readyState !== READY_STATE.open}
        style={{ marginRight: 12 }}
      >
        ❌ disconnect
      </button>
      {/* connect */}
      <button onClick={() => connect && connect()} disabled={readyState === READY_STATE.open}>
        📞 connect
      </button>
      <div style={{ marginTop: 8 }}>readyState: {readyState}</div>
      <div style={{ marginTop: 8 }}>
        <p>received message: </p>
        {messageHistory.current.map((message, index) => (
          <p key={index}>{message?.data}</p>
        ))}
      </div>
    </div>
  );
};
