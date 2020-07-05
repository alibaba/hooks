/**
 * title: refreshOnWindowFocus
 * desc: If `options.refreshOnWindowFocus` is set, useRequest will reRequest in the browser refocus or revisible. On next component load. You can set the request interval by setting `options.focusTimespan`. The default is 5000ms.
 *
 * title.zh-CN: 屏幕聚焦重新请求
 * desc.zh-CN: 如果你设置了 `options.refreshOnWindowFocus = true` ，则在浏览器窗口 `refocus` 和 `revisible` 时，会重新发起请求。你可以通过设置 `options.focusTimespan` 来设置请求间隔，默认为 `5000ms` 。
 */

import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import React from 'react';
import Mock from 'mockjs';

function getUsername(): Promise<string> {
  const userInfo = Mock.mock('@name');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userInfo);
    }, 1000);
  });
}

export default () => {
  const { data, loading } = useRequest(getUsername, {
    refreshOnWindowFocus: true,
  });

  return (
    <div>
      <p>
        You can try to click elsewhere and click back to try. (Or hide the page and show it again)
      </p>
      <Spin spinning={loading}>
        <div>Username: {data}</div>
      </Spin>
    </div>
  );
};
