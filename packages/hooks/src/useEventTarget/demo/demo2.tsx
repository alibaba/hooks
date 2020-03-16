/**
 * title: Custom transformer function
 * desc: controlled Input component with number input only
 * title.zh-CN: 自定义转换函数
 * desc.zh-CN: 只能输入数字的受控Input组件
 */

import React, { Fragment } from 'react';
import { Input, Button } from 'antd';
import { useEventTarget } from '@umijs/hooks'

export default () => {
  const [valueProps, reset] = useEventTarget('', (val: string) => {
    return val.replace(/[^\d]/g, '')
  });

  return (<Fragment>
    <Input {...valueProps} style={{ width: 200, marginRight: 20 }} placeholder="请输入"/>
    <Button type="primary" onClick={reset}>重置</Button>
  </Fragment>
  );
};
