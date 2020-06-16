/**
 * title: Sending request manually
 * desc: Sending the request only when the "run" function is called.
 *
 * title.zh-CN: 手动触发执行
 * desc.zh-CN: 手动发送请求，只有当 run 方法被调用时请求才会发出。
 */

import { Button, Spin } from 'antd';
import React from 'react';
import { useAPI } from '@umijs/hooks';

export default () => {
  const { data, loading, run } = useAPI({
    url: 'https://helloacm.com/api/random/?n=8&x=4',
    manual: true,
  });

  return (
    <>
      <Spin spinning={loading}>ID: {data}</Spin>
      <Button onClick={run} style={{ marginTop: 16 }}>
        fetch
      </Button>
    </>
  );
};
