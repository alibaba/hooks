/**
 * title: Default usage
 * desc: Do async check when component is mounted.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 组件加载时进行异步的检查
 */

import { useAsyncEffect } from 'ahooks';
import React, { useState } from 'react';

function mockCheck(): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
}

export default () => {
  const [pass, setPass] = useState<boolean>();

  useAsyncEffect(async () => {
    setPass(await mockCheck());
  }, []);

  return (
    <div>
      {pass === undefined && 'Checking...'}
      {pass === true && 'Check passed.'}
    </div>
  );
};
