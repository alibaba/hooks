/**
 * title: Lazy load
 * desc: Pass in a function that returns the DOM element.
 *
 * title.zh-CN: 懒加载
 * desc.zh-CN: 传入 function 或者 dom 来监听任意的 dom 节点。
 */

import React from 'react';
import useHover from '..';

export default () => {
  const [isHovering] = useHover({
    dom: () => document.getElementById('hover-div'),
    onEnter: () => {
      console.log('onEnter');
    },
    onLeave: () => {
      console.log('onLeave');
    },
  });

  return <div id="hover-div">{isHovering ? 'hover' : 'leaveHover'}</div>;
};
