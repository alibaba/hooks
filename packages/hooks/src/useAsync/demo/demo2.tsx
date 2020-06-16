/**
 * title: Manually triggered
 * desc: If manual is set, the async function only be executed when the "run" function is called.
 *
 * title.zh-CN: 手动触发执行
 * desc.zh-CN: 如果设置了 manual，则只有在执行函数 run 时，async function 才会被执行
 */

import { Button, Spin } from 'antd';
import React from 'react';
import { useAsync } from '@umijs/hooks';

function getNumber() {
  return fetch('https://helloacm.com/api/random/?n=8&x=4').then(res => res.json());
}

export default () => {
  const { data, loading, run } = useAsync(() => getNumber(), { manual: true });

  return (
    <>
      <Spin spinning={loading}>Number: {data}</Spin>
      <Button onClick={run} style={{ marginTop: 16 }}>
        fetch
      </Button>
    </>
  );
};
