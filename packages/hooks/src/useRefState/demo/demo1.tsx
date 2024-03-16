/**
 * title: Basic usage
 * desc: useRefState The closure trap is solved by adding a function that gets the current state
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: useRefState 多了一个获取当前最新state的函数，解决了闭包陷阱
 */

import React, { useEffect } from 'react';
import { useRefState } from 'ahooks';


export default () => {
  const [value, setValue, getValue] = useRefState(false);

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

