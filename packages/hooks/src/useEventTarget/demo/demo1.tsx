/**
 * title: Basic usage
 * desc: controlled Input component with initial value and reset functionality
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 带初始化值跟重置的受控Input组件
 */

import React, { Fragment } from 'react';
import { Input, Button } from 'antd';
import { useEventTarget } from '@umijs/hooks'

export default () => {
  const [valueProps, reset] = useEventTarget('this is initial value');

  return (<Fragment>
      <Input {...valueProps} style={{ width: 200, marginRight: 20 }}/>
      <Button type="primary" onClick={reset}>重置</Button>
    </Fragment>
  );
};
