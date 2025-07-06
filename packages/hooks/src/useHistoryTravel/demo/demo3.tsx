/**
 * title: Limit maximum history length
 * desc: Limit the maximum number of history records to avoid excessive memory consumption.
 *
 * title.zh-CN: 限制历史记录最大长度
 * desc.zh-CN: 限制最大历史记录数量,避免过度占用内存。
 */

import { useHistoryTravel } from 'ahooks';
import React from 'react';

export default () => {
  const maxLength = 3;
  const { value, setValue, backLength, forwardLength, back, forward } = useHistoryTravel<string>(
    '',
    maxLength,
  );

  return (
    <div>
      <div>maxLength: {maxLength}</div>
      <div>backLength: {backLength}</div>
      <div>forwardLength: {forwardLength}</div>
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
