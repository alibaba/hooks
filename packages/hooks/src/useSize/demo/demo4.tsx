/**
 * title: throttle
 * desc: useSize can receive throttleOptions as argument
 *
 * title.zh-CN: 节流
 * desc.zh-CN: useSize 可以接收 throttleOptions 参数
 */

import React, { useRef } from "react";
import { useSize } from "ahooks";

export default () => {
  const ref = useRef(null);
  const size = useSize(ref, { throttleOptions: { wait: 300 } });
  return (
    <div ref={ref}>
      <p>Try to resize the preview window </p>
      <p>
        width: {size?.width}px, height: {size?.height}px
      </p>
    </div>
  );
};
