/**
 * title: Default usage
 * desc: Try to swipe on the screen.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 尝试划动一下屏幕
 */
import React, { useState } from 'react';
import { useSwipeEvent } from 'ahooks';

export default () => {
  const [direction, setDirection] = useState('');
  const [distance, setDistance] = useState(0);

  const onSwipeLeft = (dist, event) => {
    console.log('onSwipeLeft', event);
    setDirection('left');
    setDistance(dist);
  };

  const onSwipeRight = (dist, event) => {
    console.log('onSwipeRight', event);
    setDirection('right');
    setDistance(dist);
  };

  const onSwipeUp = (dist, event) => {
    console.log('onSwipeUp', event);
    setDirection('up');
    setDistance(dist);
  };

  const onSwipeDown = (dist, event) => {
    console.log('onSwipeDown', event);
    setDirection('down');
    setDistance(dist);
  };

  useSwipeEvent(document.body, {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  });

  return (
    <div>
      <p>划动方向：{direction}</p>
      <p>划动距离：{distance}</p>
    </div>
  );
};
