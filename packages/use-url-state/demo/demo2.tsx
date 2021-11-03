/**
 * title: Multi-state management
 * desc: useUrlState can manage multiple states at the same time
 *
 * title.zh-CN: 多状态管理
 * desc.zh-CN: useUrlState 可以同时管理多个状态
 */

import React from 'react';
import useUrlState from '@ahooksjs/use-url-state';

export default () => {
  const [state, setState] = useUrlState({ page: '1', pageSize: '10' });

  return (
    <>
      <div>
        page: {state.page}
        <span style={{ paddingLeft: 8 }}>
          <button
            onClick={() => {
              setState((s) => ({ page: Number(s.page) + 1 }));
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              setState((s) => ({ page: Number(s.page) - 1 }));
            }}
            style={{ margin: '0 8px' }}
          >
            -
          </button>
          <button
            onClick={() => {
              setState({ page: undefined });
            }}
          >
            reset
          </button>
        </span>
      </div>
      <br />
      <div>
        pageSize: {state.pageSize}
        <span style={{ paddingLeft: 8 }}>
          <button
            onClick={() => {
              setState((s) => ({ pageSize: Number(s.pageSize) + 1 }));
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              setState((s) => ({ pageSize: Number(s.pageSize) - 1 }));
            }}
            style={{ margin: '0 8px' }}
          >
            -
          </button>
          <button
            onClick={() => {
              setState({ pageSize: undefined });
            }}
          >
            reset
          </button>
        </span>
      </div>
    </>
  );
};
