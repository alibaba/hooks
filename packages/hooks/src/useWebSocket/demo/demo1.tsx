/**
 * title: Default usage
 * desc: Update state or props, you can see the output in the console
 *
 * title.zh-CN: 默认用法
 * desc.zh-CN: 更新 state 或 props，可以在控制台看到输出
 */

import React from 'react';
import { useWebSocket } from 'ahooks';
import { READY_STATE } from '../../../lib/useWebSocket';

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
      <button
        onClick={() => sendMessage && sendMessage(`${Date.now()}`)}
        disabled={readyState !== READY_STATE.open}
      >
        ✉️
      </button>
      &nbsp;&nbsp;
      <button
        onClick={() => disconnectWebSocket && disconnectWebSocket()}
        disabled={readyState !== READY_STATE.open}
      >
        ❌
      </button>
      &nbsp;&nbsp;
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
