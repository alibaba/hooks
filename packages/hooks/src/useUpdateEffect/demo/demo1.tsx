/**
 * title: Basic usage
 * desc: This hook is exactly the same as useEffect, except it skips running the effect for the first time.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 使用上与 useEffect 完全相同，只是它忽略了首次执行，只在依赖项更新时执行。
 */

import React, { useEffect, useState } from 'react';
import { useUpdateEffect } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);
  const [updateEffectCount, setUpdateEffectCount] = useState(0);

  useEffect(() => {
    setEffectCount((c) => c + 1);
  }, [count]);

  useUpdateEffect(() => {
    setUpdateEffectCount((c) => c + 1);
    return () => {
      // do something
    };
  }, [count]); // you can include deps array if necessary

  return (
    <div>
      <p>effectCount: {effectCount}</p>
      <p>updateEffectCount: {updateEffectCount}</p>
      <p>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          reRender
        </button>
      </p>
    </div>
  );
};
