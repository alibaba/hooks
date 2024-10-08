/**
 * title: debounce
 * desc: useSize can receive debounceOptions as argument
 *
 * title.zh-CN: 防抖
 * desc.zh-CN: useSize 可以接收 debounceOptions 参数
 */

import React, { useRef } from "react";
import { useSize } from "ahooks";

export default () => {
  const ref = useRef(null);
  const size = useSize(ref, { debounceOptions: { wait: 300 } });
  return (
    <div ref={ref}>
      <p>Try to resize the preview window </p>
      <p>
        width: {size?.width}px, height: {size?.height}px
      </p>
    </div>
  );
};
