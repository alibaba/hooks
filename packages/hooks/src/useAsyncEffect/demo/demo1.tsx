/**
 * title: Default usage
 * description: Do async check when component is mounted.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 组件加载时进行异步的检查
 */

import React, { useState } from 'react';
import { useAsyncEffect } from 'ahooks';

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
