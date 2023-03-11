/**
 * title: Break off
 * desc: Use `yield` to stop the execution when effect has been cleaned up.
 *
 * title.zh-CN: 中断执行
 * desc.zh-CN: 通过 `yield` 语句可以增加一些检查点，如果发现当前 effect 已经被清理，会停止继续往下执行。
 */

import React, { useState } from 'react';
import { useAsyncEffect } from 'ahooks';

function mockCheck(val: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(val.length > 0);
    }, 1000);
  });
}

export default () => {
  const [value, setValue] = useState('');
  const [pass, setPass] = useState<boolean>();

  useAsyncEffect(
    async function* () {
      setPass(undefined);
      const result = await mockCheck(value);
      yield; // Check whether the effect is still valid, if it is has been cleaned up, stop at here.
      setPass(result);
    },
    [value],
  );

  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <p>
        {pass === null && 'Checking...'}
        {pass === false && 'Check failed.'}
        {pass === true && 'Check passed.'}
      </p>
    </div>
  );
};
