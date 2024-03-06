import React, { useLayoutEffect, useRef } from 'react';
import { Button, Space } from 'antd';
import { useDeepCompareLayoutEffect, useUpdate } from 'ahooks';

export default () => {
  const update = useUpdate();
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
    <Space direction="vertical">
      <p>effectCount: {effectCountRef.current}</p>
      <p>deepCompareCount: {deepCompareCountRef.current}</p>
      <Button onClick={update}>reRender</Button>
    </Space>
  );
};
