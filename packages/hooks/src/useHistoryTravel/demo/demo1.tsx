/**
 * title: Basic usage
 * desc: redo and undo operations
 *
 * title.zh-CN: 基本用法
 * desc.zh: 撤销跟重做操作.
 */

import { useHistoryTravel } from 'ahooks';
import React, { useState } from 'react';

export default () => {
  const { value, setValue, backLength, forwardLength, back, forward, go, reset } = useHistoryTravel([
    'do homework',
  ]);

  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState(0);

  const onAdd = () => {
    setValue([...value, inputValue]);
    setInputValue('');
  };

  const onGo = () => {
    go(step);
    setStep(0);
  };

  const onReset = () => {
    reset();
    setStep(0);
    setInputValue('');
  }

  return (
    <div>
      <div style={{ border: '1px solid black', padding: 16, margin: '16px 0' }}>
        <h3>TODO List</h3>
        <ul>
          {value.map((it, index) => (
            <li key={index}>{it}</li>
          ))}
        </ul>
      </div>
      <div style={{ marginBottom: 20 }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Please enter TODO name"
          style={{ width: 200, marginRight: 20 }}
        />
        <button type="button" onClick={onAdd} style={{ marginRight: 20 }}>
          {' '}
          Add TODO{' '}
        </button>
        <button type="button" disabled={backLength <= 0} onClick={back} style={{ marginRight: 20 }}>
          {' '}
          Undo{' '}
        </button>
        <button type="button" disabled={forwardLength <= 0} onClick={forward} style={{ marginRight: 20 }}>
          {' '}
          Redo{' '}
        </button>
        <button type="button" disabled={!backLength && !forwardLength} onClick={onReset}>
          {' '}
          Reset{' '}
        </button>
      </div>
      <div>
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(e.target.value as any)}
          max={forwardLength}
          min={backLength * -1}
          style={{ marginRight: 20, width: 60 }}
        />
        <button type="button" onClick={onGo}>
          Go
        </button>
      </div>
    </div>
  );
};
