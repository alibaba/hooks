/**
 * title: Basic usage
 * desc: This hook is exactly the same as useEffect, except it omits the first render and only runs when dependencies update.
 * 
 * title.zh-CN: 基础使用
 * desc.zh-CN: 使用上与 useEffect 完全相同，只是它忽略了首次渲染，且只在依赖项更新时运行。
 */

import { Button } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import { useUpdateEffect } from '@umijs/hooks';

export default () => {
  const [count, setCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);
  const [updateEffectCount, setUpdateEffectCount] = useState(0);

  useLayoutEffect(() => {
    setEffectCount(c => c + 1);
  }, [count]);

  useUpdateEffect(() => {
    setUpdateEffectCount(c => c + 1);
    return () => {
      // do something
    };
  }, [count]); // you can include deps array if necessary

  return (
    <div>
      <p>effectCount: {effectCount}</p>
      <p>updateEffectCount: {updateEffectCount}</p>
      <p>
        <Button type="primary" onClick={() => setCount(c => c + 1)}>
          reRender
        </Button>
      </p>
    </div>
  );
};
