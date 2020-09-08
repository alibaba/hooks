/**
 * title: Default usage
 * desc: WebSocket hooks used.
 *
 * title.zh-CN: 默认用法
 * desc.zh-CN: webSocket hooks 使用
 */

import React from 'react';
import { useWebSocket } from 'ahooks';

enum READY_STATE {
  connecting = 0,
  open = 1,
  closing = 2,
  closed = 3,
}

export default () => {
  const {
    readyState,
    sendMessage,
    latestMessage,
    disconnectWebSocket,
    connectWebSocket,
  } = useWebSocket('ws://localhost:3000');

  return (
    <div>
      {/* send message */}
      <button
        onClick={() => sendMessage && sendMessage(`${Date.now()}`)}
        disabled={readyState !== READY_STATE.open}
      >
        ✉️
      </button>
      &nbsp;&nbsp;
      {/* disconnect */}
      <button
        onClick={() => disconnectWebSocket && disconnectWebSocket()}
        disabled={readyState !== READY_STATE.open}
      >
        ❌
      </button>
      &nbsp;&nbsp;
      {/* connect */}
      <button
        onClick={() => connectWebSocket && connectWebSocket()}
        disabled={readyState === READY_STATE.open}
      >
        📞
      </button>
      <p>readyState: {readyState}</p>
      <p>latestMessage: {latestMessage?.data}</p>
    </div>
  );
};
