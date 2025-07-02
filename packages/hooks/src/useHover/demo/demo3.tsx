/**
 * title: Basic usage
 * desc: Use ref or Pass in DOM element.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 使用 ref 或者传入 DOM 元素。
 */

import React, { useRef, useState } from "react";
import { useHover } from "ahooks";

export default () => {
  const ref = useRef(null);
  const [isLongHovering, setIsLongHovering] = useState(false);
  const isHovering = useHover(ref, {
    longHoverDuration: 1000,
    onLongHover: (value) => {
      setIsLongHovering(value);
    },
  });
  return (
    <div ref={ref}>
      <div>isHovering: {isHovering ? "hover" : "leave hover"}</div>

      <div>
        isLongHovering: {isLongHovering ? "long Hover" : "leave Hover"}{" "}
        (delay：1000ms)
      </div>
    </div>
  );
};
