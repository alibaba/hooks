/**
 * title: Polling
 * desc: <ul>If options.pollingInterval is set, Polling can be turned on.
 *  <li>You can set `pollingWhenHidden=false` to temporarily suspend the scheduled task when the screen is not visible.</li>
 *  <li>Use `run` / `cancel` to start / stop polling.</li>
 *  <li>When `manual=true`, you need to run `run` for the first time before you start polling.</li></ul>
 *
 * title.zh-CN: 轮询
 * desc.zh-CN: <ul>通过设置 `pollingInterval` ，进入轮询模式，定时触发函数执行。
 *  <li> 通过设置 `pollingWhenHidden=false` ，在屏幕不可见时，暂时暂停定时任务。</li>
 *  <li> 通过 `run` / `cancel` 来 开启/停止 轮询。</li>
 *  <li> 在 `manual=true` 时，需要第一次执行 `run` 后，才开始轮询。</li></ul>
 */

import { useRequest } from '@umijs/hooks';
import { Button, Spin } from 'antd';
import React from 'react';
import { getUsername } from './service';

export default () => {
  const { data, loading, run, cancel } = useRequest(getUsername, {
    pollingInterval: 1000,
    pollingWhenHidden: false
  })

  return (
    <>
      <Spin spinning={loading}>
        <p>Username: {data}</p>
      </Spin>
      <Button.Group>
        <Button onClick={run}>start</Button>
        <Button onClick={cancel}>stop</Button>
      </Button.Group>
    </>
  )
}
