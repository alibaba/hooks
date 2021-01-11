/**
 * title: Default usage
 *
 * title.zh-CN: 基础用法
 */

import React, { useState } from 'react';
import useAsyncState from '../index';


const Child = () => {

  const [value, setValue] = useAsyncState<string>()
  React.useEffect(() => {
    setTimeout(() => {
      setValue('从服务端获取的数据')
    }, 5000)
  }, [])

  const text = value || '正在获取数据。。。'

  return (
    <div>{text}</div>
  )
}


export default () => {
  

  const [visible, setVisible] = useAsyncState(true);


  return (
    <div>
      <button onClick={() => setVisible(false)}>卸载</button>
      {visible && <Child />}
    </div>
  );
};
