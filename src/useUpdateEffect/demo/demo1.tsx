/**
 * title: Default usage
 * desc: This hook is exactly the same as useEffect, except it omits the first render and only runs when dependencies update.
 */

import React, { useLayoutEffect, useState } from 'react';
import { Button } from 'antd';
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
