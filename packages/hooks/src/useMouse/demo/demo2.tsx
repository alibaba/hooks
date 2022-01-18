/**
 * title: Pass in DOM element
 * desc: Tracking cursor and incoming DOM element position.
 *
 * title.zh-CN: 传入 DOM 元素
 * desc.zh-CN: 获取鼠标和传入 DOM 元素的位置。
 */

import React, { useRef } from 'react';
import { useMouse } from 'ahooks';

export default () => {
  const ref = useRef();
  const mouse = useMouse(ref.current);

  return (
    <>
      <div
        ref={ref}
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: 'gray',
          color: 'white',
          lineHeight: '200px',
          textAlign: 'center',
        }}
      >
        element
      </div>
      <div>
        <p>
          client - x: {mouse.clientX}, y: {mouse.clientY}
        </p>
        <p>
          page - x: {mouse.pageX}, y: {mouse.pageY}
        </p>
        <p>
          screen - x: {mouse.screenX}, y: {mouse.screenY}
        </p>
        <p>
          elementPos - x: {mouse.elementPosX}, y: {mouse.elementPosY}
        </p>
        <p>
          element - x: {mouse.elementX}, y: {mouse.elementY}
        </p>
        <p>
          element dimensions - {mouse.elementW} x {mouse.elementH}
        </p>
      </div>
    </>
  );
};
