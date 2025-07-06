/**
 * title: Custom shouldUpdate function
 * desc: Previous value update only when the shouldUpdate function return true.
 *
 * title.zh-CN: 自定义 shouldUpdate 函数
 * desc.zh-CN: 只有 shouldUpdate function 返回 true 时，才会记录值的变化。
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
      <div style={{ margin: '8px 0', border: '1px solid #e8e8e8', padding: 8 }}>
        <div>current name: {state.name}</div>
        <div>current job: {state.job}</div>
      </div>
      <div>previous name: {(previousName || {}).name}</div>
      <div style={{ marginBottom: 8 }}>previous job: {(previousJob || {}).job}</div>
      <div style={{ marginTop: 8 }}>
        <input
          style={{ width: 220 }}
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="new name"
        />
        <button
          type="button"
          onClick={() => {
            setState((s) => ({ ...s, name: nameInput }));
          }}
          style={{ marginLeft: 8 }}
        >
          update
        </button>
      </div>
      <div style={{ marginTop: 8 }}>
        <input
          style={{ width: 220 }}
          value={jobInput}
          onChange={(e) => setJobInput(e.target.value)}
          placeholder="new job"
        />
        <button
          type="button"
          onClick={() => {
            setState((s) => ({ ...s, job: jobInput }));
          }}
          style={{ marginLeft: 8 }}
        >
          update
        </button>
      </div>
    </>
  );
};
