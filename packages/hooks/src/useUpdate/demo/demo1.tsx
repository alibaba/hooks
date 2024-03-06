/**
 * title: Basic usage
 * description: Forces component to re-render.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 强制组件重新渲染。
 */

import React from 'react';
import { Button } from 'antd';
import { useUpdate } from 'ahooks';

export default () => {
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <Button style={{ marginTop: 8 }} onClick={update}>
        Update
      </Button>
    </>
  );
};
