/**
 * title: Default usage
 * desc: DebouncedValue will change after the input ends 500ms.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: DebouncedValue 只会在输入结束 500ms 后变化。
 */

import React, { useState } from 'react';
import { useDebounce } from 'ahooks';

export default () => {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, { wait: 500 });

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  );
};
