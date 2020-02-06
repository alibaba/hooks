/**
 * title: Using compare function
 * desc: The stored previous value update only when the compare function returns true.
 * 
 * title.zh-CN: 使用 compare function
 * desc.zh-CN: 只有 compare function 返回 true 时，才会记录值的变化
 */

import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { usePrevious } from '@umijs/hooks';

interface Person {
  name: string;
  job: string;
}

const nameCompareFunction = (prev: Person | undefined, next: Person) => {
  if (!prev) {
    return true;
  }
  if (prev.name !== next.name) {
    return true;
  }
  return false;
};

const jobCompareFunction = (prev: Person | undefined, next: Person) => {
  if (!prev) {
    return true;
  }
  if (prev.job !== next.job) {
    return true;
  }
  return false;
};

export default () => {
  const [state, setState] = useState({ name: 'Jack', job: 'student' });
  const [nameInput, setNameInput] = useState('');
  const [jobInput, setJobInput] = useState('');
  const previousName = usePrevious(state, nameCompareFunction);
  const previousJob = usePrevious(state, jobCompareFunction);

  return (
    <>
      <div style={{ margin: 8, border: '1px solid #e8e8e8', padding: 8 }}>
        current state:
        <div>name: {state.name}</div>
        <div>job: {state.job}</div>
      </div>
      <div>
        {state.name}&#39;s previous name: {(previousName || {}).name}
      </div>
      <div style={{ marginBottom: 16 }}>
        {state.name}&#39;s previous job: {(previousJob || {}).job}
      </div>
      <Input.Group compact>
        <Input
          style={{ width: 220 }}
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
          placeholder={`${state.name}'s new name`}
        />
        <Button
          onClick={() => {
            setState(s => ({ ...s, name: nameInput }));
          }}
        >
          update
        </Button>
      </Input.Group>
      <Input.Group compact style={{ marginTop: 16 }}>
        <Input
          style={{ width: 220 }}
          value={jobInput}
          onChange={e => setJobInput(e.target.value)}
          placeholder={`${state.name}'s new job`}
        />
        <Button
          onClick={() => {
            setState(s => ({ ...s, job: jobInput }));
          }}
        >
          update
        </Button>
      </Input.Group>
    </>
  );
};
