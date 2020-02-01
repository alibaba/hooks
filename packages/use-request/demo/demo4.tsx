/**
 * title: Polling
 * desc: If options.pollingInterval is set, Polling can be turned on.
 * - You can set `pollingWhenHidden=false` to temporarily suspend the scheduled task when the screen is not visible.
 * - Use `run` / `cancel` to start / stop polling.
 * - When `manual=true`, you need to run `run` for the first time before you start polling.
 *
 * title.zh-CN: 轮询
 * desc.zh-CN: 通过设置 `pollingInterval` ，进入轮询模式，定时触发函数执行。
 * - 通过设置 `pollingWhenHidden=false` ，在屏幕不可见时，暂时暂停定时任务。
 * - 通过 `run` / `cancel` 来 开启/停止 轮询。
 * - 在 `manual=true` 时，需要第一次执行 `run` 后，才开始轮询。
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
