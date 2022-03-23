/**
 * title: Mouse position relative to the element
 * desc: By passing in the target element, you can get the position of the mouse relative to the element.
 *
 * title.zh-CN: 获取鼠标相对于元素的位置
 * desc.zh-CN: 通过传入目标元素，可以获取鼠标相对于元素的位置。
 */

import React, { useRef } from 'react';
import { useMouse } from 'ahooks';

export default () => {
  const ref = useRef(null);
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
          Mouse In Element - x: {mouse.elementX}, y: {mouse.elementY}
        </p>
        <p>
          Element Position - x: {mouse.elementPosX}, y: {mouse.elementPosY}
        </p>
        <p>
          Element Dimensions - width: {mouse.elementW}, height: {mouse.elementH}
        </p>
      </div>
    </>
  );
};
