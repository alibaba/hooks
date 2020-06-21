/**
 * title: Polling
 * desc: |
 *  If `options.pollingInterval` is set, Polling can be turned on.
 *  - You can set `options.pollingWhenHidden=false` to temporarily suspend the scheduled task when the screen is not visible.
 *  - Use `run` / `cancel` to start / stop polling.
 *  - When `options.manual=true`, you need to call the `run` function to start the polling.
 *
 * title.zh-CN: 轮询
 * desc.zh-CN: |
 *  通过设置 `options.pollingInterval` ，进入轮询模式，定时触发函数执行。
 *
 *  - 通过设置 `options.pollingWhenHidden=false` ，在屏幕不可见时，暂时暂停定时任务。
 *  - 通过 `run` / `cancel` 来 开启/停止 轮询。
 *  - 在 `options.manual=true` 时，需要第一次执行 `run` 后，才开始轮询。
 */

import { useRequest } from 'ahooks';
import React from 'react';
import Mock from 'mockjs';

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const { data, loading, run, cancel } = useRequest(getUsername, {
    pollingInterval: 1000,
    pollingWhenHidden: false,
  });

  return (
    <>
      <p>Username: {loading ? 'loading' : data}</p>
      <button type="button" onClick={run}>
        start
      </button>
      <button type="button" onClick={cancel} style={{ marginLeft: 8 }}>
        stop
      </button>
    </>
  );
};
