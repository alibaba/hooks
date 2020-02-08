/**
 * title: Polling
 * desc: The request will be sent every 3 seconds, the timer will start running only if the last request has been received.
 *
 * title.zh-CN: 轮询
 * desc.zh-CN: 每三秒进行一次请求，将在上次请求返回后开始计时。
 */

import { Button, Spin } from 'antd';
import React from 'react';
import { useAPI } from '@umijs/hooks';

export default () => {
  const { data, loading, timer } = useAPI({
    url: 'https://helloacm.com/api/random/?n=8&x=4',
    pollingInterval: 3000,
  });

  return (
    <>
      <Spin spinning={loading}>ID: {data}</Spin>
      <Button.Group style={{ marginTop: 16 }}>
        <Button onClick={timer.pause}>pause</Button>
        <Button onClick={timer.stop}>stop</Button>
        <Button onClick={timer.resume}>resume</Button>
      </Button.Group>
    </>
  );
};
