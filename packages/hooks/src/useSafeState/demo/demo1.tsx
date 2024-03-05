/**
 * title: Basic usage
 * description:
 *
 * title.zh-CN: 基础用法
 * description.zh-CN:
 */

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useSafeState } from 'ahooks';

const Child = () => {
  const [value, setValue] = useSafeState<string>();
  const text = value || 'Loading...';

  useEffect(() => {
    setTimeout(() => {
      setValue('data loaded from server');
    }, 5000);
  }, []);

  return <div>{text}</div>;
};

export default () => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Button style={{ marginBottom: 8 }} onClick={() => setVisible(false)}>
        Unmount
      </Button>
      {visible && <Child />}
    </>
  );
};
