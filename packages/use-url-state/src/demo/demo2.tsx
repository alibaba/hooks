/**
 * title: Multi-state management
 * description: useUrlState can manage multiple states at the same time.
 *
 * title.zh-CN: 多状态管理
 * description.zh-CN: useUrlState 可以同时管理多个状态。
 */

import React from 'react';
import { Button, Space } from 'antd';
import useUrlState from '@ahooksjs/use-url-state';

export default () => {
  const [state, setState] = useUrlState({ page: '1', pageSize: '10' });

  return (
    <>
      <Space style={{ display: 'flex', marginBottom: 8 }}>
        <span>page: {state.page}</span>
        <Button
          onClick={() => {
            setState((s) => ({ page: Number(s.page) + 1 }));
          }}
        >
          +
        </Button>
        <Button
          onClick={() => {
            setState((s) => ({ page: Number(s.page) - 1 }));
          }}
        >
          -
        </Button>
        <Button
          onClick={() => {
            setState({ page: undefined });
          }}
        >
          Reset
        </Button>
      </Space>
      <Space>
        <span>pageSize: {state.pageSize}</span>
        <Button
          onClick={() => {
            setState((s) => ({ pageSize: Number(s.pageSize) + 1 }));
          }}
        >
          +
        </Button>
        <Button
          onClick={() => {
            setState((s) => ({ pageSize: Number(s.pageSize) - 1 }));
          }}
        >
          -
        </Button>
        <Button
          onClick={() => {
            setState({ pageSize: undefined });
          }}
        >
          Reset
        </Button>
      </Space>
    </>
  );
};
