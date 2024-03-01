/**
 * title: Basic usage
 * description: Redo and undo operations，click back and forward after input something.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 撤销跟重做操作，输入内容后，点击 back 和 forward。
 */

import React from 'react';
import { useHistoryTravel } from 'ahooks';

export default () => {
  const { value, setValue, backLength, forwardLength, back, forward } = useHistoryTravel<string>();

  return (
    <div>
      <input value={value || ''} onChange={(e) => setValue(e.target.value)} />
      <button disabled={backLength <= 0} onClick={back} style={{ margin: '0 8px' }}>
        back
      </button>
      <button disabled={forwardLength <= 0} onClick={forward}>
        forward
      </button>
    </div>
  );
};
