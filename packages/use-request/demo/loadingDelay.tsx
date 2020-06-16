/**
 * title: Loading Delay
 * desc: Setting `options.loadingDelay` can specifies a delay in milliseconds for loading (prevent flush).
 *
 * title.zh-CN: Loading Delay
 * desc.zh-CN: 通过设置 `options.loadingDelay` ，可以延迟 `loading` 变成 `true` 的时间，有效防止闪烁。
 */

import { useRequest } from '@umijs/hooks';
import { Spin, Button } from 'antd';
import React from 'react';

async function getCurrentTime(): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(new Date().getTime())
    }, 100)
  });
}

export default () => {
  const getTimeAction = useRequest(getCurrentTime);

  const withLoadingDelayAction = useRequest(getCurrentTime, {
    loadingDelay: 200
  });

  const trigger = () => {
    getTimeAction.run();
    withLoadingDelayAction.run();
  }

  return (
    <div>
      <p>loadingDelay can set delay loading, which can effectively prevent loading from flickering.</p>
      <Button onClick={trigger}>
        run
      </Button>

      <div style={{ margin: '24px 0', width: 300 }}>
        <Spin spinning={getTimeAction.loading}>
          Double Count: {getTimeAction.data}
        </Spin>
      </div>
      <div>
        <Spin spinning={withLoadingDelayAction.loading}>
          Double Count: {withLoadingDelayAction.data}
        </Spin>
      </div>
    </div>
  );
};
