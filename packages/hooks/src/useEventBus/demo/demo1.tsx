/**
 * title: Basic usage
 * desc: `useEventBus` Be synonymous with `Bus.$on`，However, you can depend on the value of the state and remount the function when dependent on updates,Once subscribed, methods can be called from anywhere
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: `useEventBus` 用法等同于 `Bus.$on`，但是可以依赖状态的值，依赖更新时重新挂载函数。订阅后任何地方都可以调用方法
 */

import React, { useState } from 'react';
import { Bus, useEventBus } from 'ahooks';

export default () => {
  const [count, setCount] = useState(0);

  const updateCount = async () => {
    setCount(count + 1);
  };
  // 订阅后任意地方都可以调用,适合跨组件,跨组件内外. 注意:组件卸载后会销毁
  useEventBus('updateCount', updateCount, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>
        <button
          type="button"
          onClick={() => {
            // 异步提交
            Bus.$emit('updateCount');
            // 同步提交
            Bus.$asyncEmit('updateCount');
          }}
        >
          Calling Bus method
        </button>
      </p>
    </div>
  );
};
