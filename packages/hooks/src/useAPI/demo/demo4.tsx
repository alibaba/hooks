/**
 * title: Modifying the request method
 * desc: Using your custom request method.
 *
 * title.zh-CN: 修改 request 方法
 * desc.zh-CN: 使用自定义的 request 方法。
 */

import React from 'react';
import { Button, notification } from 'antd';
import { useAPI } from '@umijs/hooks';

export default () => {
  const { run } = useAPI({
    url: 'https://helloacm.com/api/random/?n=8&x=4',
    manual: true,
    method: (...args) => {
      notification.success({
        description: `request sent, url is ${args[0]}`,
        message: 'fake request',
      });
      return new Promise(resolve => resolve(null));
    },
  });

  return (
    <>
      <Button.Group>
        <Button onClick={run} style={{ marginTop: 16 }}>
          fetch
        </Button>
      </Button.Group>
    </>
  );
};
