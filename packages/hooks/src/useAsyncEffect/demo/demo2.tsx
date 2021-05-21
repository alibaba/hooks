/**
 * title: Clean up
 * desc: Handle the clean up logic of effect.
 *
 * title.zh-CN: 清理逻辑
 * desc.zh-CN: 处理 effect 的清理逻辑
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
  const [pass, setPass] = useState<boolean>(null);

  useAsyncEffect(
    async (cleanUpWith) => {
      setPass(null);
      let cancelled = false;
      cleanUpWith(() => {
        cancelled = true;
      });
      const result = await mockCheck(value);
      if (cancelled) return;
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
      <button disabled={!pass}>Submit</button>
      <p>
        {pass === null && 'Checking...'}
        {pass === false && 'Check failed.'}
        {pass === true && 'Check passed.'}
      </p>
    </div>
  );
};
