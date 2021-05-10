/**
 * title: Loading Keep
 * desc: Setting `options.loadingKeep` can specifies a Keep in milliseconds for loading (prevent flush).
 *
 * title.zh-CN: Loading Keep
 * desc.zh-CN: 通过设置 `options.loadingKeep` ，可以延迟 `loading` 变成 `false` 的时间，有效防止闪烁。
 */

import { useRequest } from 'ahooks';
import React from 'react';

async function getCurrentTime(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Date().getTime());
    }, 100);
  });
}

export default () => {
  const getTimeAction = useRequest(getCurrentTime);

  const withLoadingKeepAction = useRequest(getCurrentTime, {
    loadingKeep: 800,
  });

  const trigger = () => {
    getTimeAction.run();
    withLoadingKeepAction.run();
  };

  return (
    <div>
      <p>loadingKeep can set key loading, which can effectively prevent loading from flickering.</p>
      <button type="button" onClick={trigger}>
        run
      </button>

      <div style={{ margin: '24px 0', width: 300 }}>
        Current Time: {getTimeAction.loading ? 'loading' : getTimeAction.data}
      </div>
      <div>
        Current Time: {withLoadingKeepAction.loading ? 'loading' : withLoadingKeepAction.data}
      </div>
    </div>
  );
};
