/**
 * title: Default usage
 * desc: The function is called when the component is first rendered, and the returned object has a property named 'current' which indicates whether the current component has been unmounted
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 在组件首次渲染时执行方法，返回一个含有current属性的ref对象，current表示当前组件是否已被卸载
 */

import React, { useState } from 'react';
import { useUnmountedRef } from 'ahooks';

const Button = ({ setVisible }) => {
  const unmountRef: { current: boolean } = useUnmountedRef();
  const [text, setText] = useState('I am mounted');
  const handleClick = async () => {
    await setVisible();
    !unmountRef.current && setText('I am unmounted');
  };
  return <button onClick={handleClick}>{text}</button>;
};

export default () => {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      click the button to unmount it
      <br />
      {visible ? <Button setVisible={() => setVisible(false)} /> : 'nothing'}
    </div>
  );
};
