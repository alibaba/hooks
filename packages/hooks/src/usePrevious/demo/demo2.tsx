/**
 * title: Custom shouldUpdate function
 * description: Previous value update only when the shouldUpdate function return true.
 *
 * title.zh-CN: 自定义 shouldUpdate 函数
 * description.zh-CN: 只有 shouldUpdate function 返回 true 时，才会记录值的变化。
 */

import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
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
      <div style={{ border: '1px dashed #ccc', borderRadius: 4, margin: '8px 0', padding: 8 }}>
        <div>current name: {state.name}</div>
        <div>current job: {state.job}</div>
      </div>
      <div style={{ border: '1px dashed #ccc', borderRadius: 4, margin: '8px 0', padding: 8 }}>
        <div>previous name: {(previousName || {}).name}</div>
        <div>previous job: {(previousJob || {}).job}</div>
      </div>
      <Space style={{ display: 'flex', marginTop: 8 }} wrap>
        <Input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="new name"
        />
        <Button
          onClick={() => {
            setState((s) => ({ ...s, name: nameInput }));
          }}
        >
          Update
        </Button>
      </Space>
      <Space style={{ display: 'flex', marginTop: 8 }} wrap>
        <Input
          value={jobInput}
          onChange={(e) => setJobInput(e.target.value)}
          placeholder="new job"
        />
        <Button
          onClick={() => {
            setState((s) => ({ ...s, job: jobInput }));
          }}
        >
          Update
        </Button>
      </Space>
    </>
  );
};
