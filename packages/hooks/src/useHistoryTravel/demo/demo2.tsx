/**
 * title: Todo List
 * description: Redo and undo operations.
 *
 * title.zh-CN: 可撤销恢复的 Todo List
 * description.zh-CN: 可以实现撤销恢复等操作。
 */

import React, { useState } from 'react';
import { Button, Input, InputNumber, Space } from 'antd';
import { useHistoryTravel } from 'ahooks';

export default () => {
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState(0);
  const {
    value = [],
    setValue,
    backLength,
    forwardLength,
    back,
    forward,
    go,
    reset,
  } = useHistoryTravel(['do homework']);

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
  };

  return (
    <Space direction="vertical">
      <div
        style={{
          border: '1px dashed #ccc',
          borderRadius: 4,
          padding: 8,
          marginBottom: 8,
        }}
      >
        <h4>TODO List</h4>
        <ul style={{ marginLeft: 16 }}>
          {value.map((it, index) => (
            <li key={index}>{it}</li>
          ))}
        </ul>
      </div>
      <Space wrap>
        <Input
          style={{ width: 200 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Please enter TODO name"
        />
        <Button onClick={onAdd}>Add TODO</Button>
        <Button disabled={backLength <= 0} onClick={back}>
          Undo
        </Button>
        <Button disabled={forwardLength <= 0} onClick={forward}>
          Redo
        </Button>
        <Button disabled={!backLength && !forwardLength} onClick={onReset}>
          Reset
        </Button>
      </Space>
      <Space wrap>
        <InputNumber
          value={step}
          onChange={(val) => setStep(val as number)}
          max={forwardLength}
          min={backLength * -1}
        />
        <Button onClick={onGo}>Go</Button>
      </Space>
    </Space>
  );
};
