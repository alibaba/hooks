/**
 * title: Default usage
 * desc: Sending the request only when the "run" function is called, and will be re-executed after the deps change.
 *
 * title.zh-CN: 默认用法
 * desc.zh-CN: 组件加载时立即执行，并且 deps 变化后，会重新执行。
 */

import { useAsync } from '@umijs/hooks';
import { Button, Spin } from 'antd';
import React, { useState } from 'react';

function getNumber(id: number) {
  return fetch(`https://helloacm.com/api/random/?n=8&x=4&id=${id}`).then(res => res.json());
}

export default () => {
  const [state, set] = useState(0);
  const { data, loading, cancel, run } = useAsync(() => getNumber(state), [state]);

  return (
    <>
      <Spin spinning={loading}>
        <div>id: {state}</div>
        <div>Number: {data}</div>
      </Spin>
      <Button.Group style={{ marginTop: 16 }}>
        <Button onClick={run}>reload</Button>
        <Button onClick={cancel}>cancel</Button>
        <Button onClick={() => set(c => c + 1)}>increase id</Button>
      </Button.Group>
    </>
  );
};
