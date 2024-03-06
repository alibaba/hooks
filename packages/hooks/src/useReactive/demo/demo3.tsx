/**
 * title: Computed Properties
 * description:
 *
 * title.zh-CN: 计算属性
 * description.zh-CN:
 */

import React from 'react';
import { Button, Input, Space } from 'antd';
import { useReactive } from 'ahooks';

export default () => {
  const state = useReactive({
    bug: '',
    bugs: ['feat', 'fix', 'chore'],
    addBug(bug) {
      this.bugs.push(bug);
    },
    get bugsCount() {
      return this.bugs.length;
    },
  });

  return (
    <div>
      <p>state.bugsCount: {state.bugsCount}</p>
      <form
        onSubmit={(e) => {
          state.addBug(state.bug);
          state.bug = '';
          e.preventDefault();
        }}
      >
        <Space style={{ margin: '8px 0' }} wrap>
          <Input type="text" value={state.bug} onChange={(e) => (state.bug = e.target.value)} />
          <Button
            onClick={() => {
              state.addBug(state.bug);
              state.bug = '';
            }}
          >
            Add
          </Button>
          <Button onClick={() => state.bugs.pop()}>Delete</Button>
        </Space>
      </form>
      <ul style={{ marginLeft: 16 }}>
        {state.bugs.map((bug) => (
          <li key={bug}>{bug}</li>
        ))}
      </ul>
    </div>
  );
};
