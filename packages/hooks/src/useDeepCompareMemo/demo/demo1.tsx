import React, { useState, useMemo } from 'react';
import { useDeepCompareMemo } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);

  const value1 = useMemo(() => {
    return Math.random();
  }, [{}]);

  const value2 = useDeepCompareMemo(() => {
    return Math.random();
  }, [{}]);

  return (
    <div>
      <p>useMemoValue: {value1}</p>
      <p>useDeepCompareMemoValue: {value2}</p>
      <p>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          reRender
        </button>
      </p>
    </div>
  );
};
