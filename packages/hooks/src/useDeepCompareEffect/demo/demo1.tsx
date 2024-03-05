import React, { useEffect, useRef } from 'react';
import { Button, Space } from 'antd';
import { useDeepCompareEffect, useUpdate } from 'ahooks';

export default () => {
  const update = useUpdate();
  const effectCountRef = useRef(0);
  const deepCompareCountRef = useRef(0);

  useEffect(() => {
    effectCountRef.current += 1;
  }, [{}]);

  useDeepCompareEffect(() => {
    deepCompareCountRef.current += 1;

    return () => {
      // do something
    };
  }, [{}]);

  return (
    <Space direction="vertical">
      <Button onClick={update}>reRender</Button>
      <p>effectCount: {effectCountRef.current}</p>
      <p>deepCompareCount: {deepCompareCountRef.current}</p>
    </Space>
  );
};
