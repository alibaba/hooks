/**
 * title: Default usage
 *
 * title.zh-CN: 基础用法
 */

import React, { useState } from 'react';
import useSafeState from '../index';


const Child = () => {

  const [value, setValue] = useSafeState<string>()
  React.useEffect(() => {
    setTimeout(() => {
      setValue('data loaded from server')
    }, 5000)
  }, [])

  const text = value || 'Loading...'

  return (
    <div>{text}</div>
  )
}


export default () => {


  const [visible, setVisible] = useSafeState(true);


  return (
    <div>
      <button onClick={() => setVisible(false)}>Unmount</button>
      {visible && <Child />}
    </div>
  );
};
