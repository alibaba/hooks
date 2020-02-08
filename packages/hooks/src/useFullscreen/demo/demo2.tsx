/**
 * title: Lazy load
 * desc: Pass in a function that returns the DOM element
 *
 * title.zh-CN: 懒加载
 * desc.zh-CN: 传入 function 来监听任意的 dom 节点
 */

import React from 'react';
import { Button } from 'antd';
import {useFullscreen} from '@umijs/hooks';
import img from './react-hooks.jpg';

export default () => {
  const { setFull } = useFullscreen<HTMLElement>({
    dom: () => document.getElementById('fullscreen-img'),
  });
  return (
    <div style={{ background: 'white' }}>
      <div style={{ marginBottom: 16 }}>
        <img id="fullscreen-img" src={img} style={{ width: 320 }} alt="" />
      </div>
      <Button onClick={setFull}>setFull</Button>
    </div>
  );
};
