/**
 * title: Default usage
 * desc: Update state or props, you can see the output in the console
 *
 * title.zh-CN: 默认用法
 * desc.zh-CN: 更新 state 或 props，可以在控制台看到输出
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
