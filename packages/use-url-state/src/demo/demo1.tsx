/**
 * title: Default usage
 * description: Store the state into url query. By set the value to `undefined`, the attribute can be removed from the url query.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 将状态同步到 url query 中。通过设置值为 `undefined`, 可以从 url query 上彻底删除某个属性，从而使用默认值。
 */

import React from 'react';
import { Button, Space } from 'antd';
import useUrlState from '@ahooksjs/use-url-state';

export default () => {
  const [state, setState] = useUrlState({ count: '1' });

  return (
    <>
      <div>state: {state?.count}</div>
      <Space style={{ marginTop: 8 }}>
        <Button onClick={() => setState({ count: Number(state.count || 0) + 1 })}>Add</Button>
        <Button onClick={() => setState({ count: undefined })}>Clear</Button>
      </Space>
    </>
  );
};
