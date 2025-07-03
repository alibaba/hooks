/**
 * title: Multi-state management (split)
 * description: useUrlState can handle multiple useUrlState updates simultaneously.
 *
 * title.zh-CN: 多状态管理 (拆分)
 * description.zh-CN: useUrlState 可以同时处理多个 useUrlState 更新。
 */

import React from 'react';
import { Button, Space } from 'antd';
import useUrlState from '@ahooksjs/use-url-state';

export default () => {
  const [page, setPage] = useUrlState({ page: '1' });
  const [pageSize, setPageSize] = useUrlState({ pageSize: '10' });

  return (
    <>
      <Space style={{ display: 'flex', marginBottom: 8 }}>
        <span>page: {page.page}</span>
        <Button
          onClick={() => {
            setPage((s) => ({ page: Number(s.page) + 1 }));
          }}
        >
          +
        </Button>
        <Button
          onClick={() => {
            setPage((s) => ({ page: Number(s.page) - 1 }));
          }}
        >
          -
        </Button>
        <Button
          onClick={() => {
            setPage({ page: undefined });
          }}
        >
          Reset
        </Button>
      </Space>
      <Space style={{ display: 'flex', marginBottom: 8 }}>
        <span>pageSize: {pageSize.pageSize}</span>
        <Button
          onClick={() => {
            setPageSize((s) => ({ pageSize: Number(s.pageSize) + 1 }));
          }}
        >
          +
        </Button>
        <Button
          onClick={() => {
            setPageSize((s) => ({ pageSize: Number(s.pageSize) - 1 }));
          }}
        >
          -
        </Button>
        <Button
          onClick={() => {
            setPageSize({ pageSize: undefined });
          }}
        >
          Reset
        </Button>
      </Space>
      <Button
        onClick={async () => {
          await setPageSize({ pageSize: undefined });
          await setPage({ page: undefined });
        }}
      >
        Reset all
      </Button>
    </>
  );
};
