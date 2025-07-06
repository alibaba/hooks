/**
 * title: Basic usage
 * desc: This hook is exactly the same as useLayoutEffect, except it skips running the effect for the first time.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 使用上与 useLayoutEffect 完全相同，只是它忽略了首次执行，且只在依赖项更新时执行。
 */

import React, { useLayoutEffect, useState } from 'react';
import { useUpdateLayoutEffect } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);
  const [layoutEffectCount, setLayoutEffectCount] = useState(0);
  const [updateLayoutEffectCount, setUpdateLayoutEffectCount] = useState(0);

  useLayoutEffect(() => {
    setLayoutEffectCount((c) => c + 1);
  }, [count]);

  useUpdateLayoutEffect(() => {
    setUpdateLayoutEffectCount((c) => c + 1);
    return () => {
      // do something
    };
  }, [count]); // you can include deps array if necessary

  return (
    <div>
      <p>layoutEffectCount: {layoutEffectCount}</p>
      <p>updateLayoutEffectCount: {updateLayoutEffectCount}</p>
      <p>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          reRender
        </button>
      </p>
    </div>
  );
};
