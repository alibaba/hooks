/**
 * title: Basic usage
 * desc: Persist state into IndexedDB
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 将状态持久化存储到 IndexedDB 中
 */

import React from 'react';
import useIndexDBState from '../index';

export default function Demo() {
  const [message, setMessage] = useIndexDBState<string>('message', {
    defaultValue: 'Hello',
  });

  return (
    <>
      <input
        value={message || ''}
        placeholder="Please enter some text"
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: 200, marginRight: 16 }}
      />
      <button
        type="button"
        onClick={() => setMessage(undefined)}
        style={{ marginRight: 16 }}
      >
        Reset
      </button>
      <button
        type="button"
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
    </>
  );
} 