/**
 * title: Using compare function
 * desc: The stored previous value update only when the compare function returns true.
 *
 * title.zh-CN: 使用 compare function
 * desc.zh-CN: 只有 compare function 返回 true 时，才会记录值的变化
 */

import React, { useState } from 'react';
import { usePrevious } from 'ahooks';

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
      <div style={{ margin: `8px 0`, border: '1px solid #e8e8e8', padding: 8 }}>
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
      <div style={{marginTop: '16px'}}>
        <input
          style={{ width: 220 }}
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
          placeholder={`${state.name}'s new name`}
        />
        <button
          onClick={() => {
            setState(s => ({ ...s, name: nameInput }));
          }}
        >
          update
        </button>
      </div>
      <div style={{marginTop: '16px'}}>
        <input
          style={{ width: 220 }}
          value={jobInput}
          onChange={e => setJobInput(e.target.value)}
          placeholder={`${state.name}'s new job`}
        />
        <button
          onClick={() => {
            setState(s => ({ ...s, job: jobInput }));
          }}
        >
          update
        </button>
      </div>
    </>
  );
};
