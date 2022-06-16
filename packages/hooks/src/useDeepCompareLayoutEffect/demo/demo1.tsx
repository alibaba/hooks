import { useDeepCompareLayoutEffect } from 'ahooks';
import React, { useLayoutEffect, useState, useRef } from 'react';

export default () => {
  const [, setCount] = useState(0);
  const effectCountRef = useRef(0);
  const deepCompareCountRef = useRef(0);

  useLayoutEffect(() => {
    effectCountRef.current += 1;
  }, [{}]);

  useDeepCompareLayoutEffect(() => {
    deepCompareCountRef.current += 1;
    return () => {
      // do something
    };
  }, [{}]);

  return (
    <div>
      <p>effectCount: {effectCountRef.current}</p>
      <p>deepCompareCount: {deepCompareCountRef.current}</p>
      <p>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          reRender
        </button>
      </p>
    </div>
  );
};
