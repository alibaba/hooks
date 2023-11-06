/**
 * title: Basic usage
 * desc: useSize can receive ref as argument
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: useSize 可以接收 ref 参数
 */

import React, { useEffect } from 'react';
import { useStateRef } from 'ahooks';


export default () => {
  const [value, setValue, getValue] = useStateRef(false);

  useEffect(() => {
    setTimeout(() => {
      setValue('data loaded from server');
    }, 2000);

    setTimeout(() => {
      console.log(getValue());
    }, 3000);
  }, []);

  const text = value || 'Loading...';

  return <div>{text}</div>;
};

