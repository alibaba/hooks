/**
 * title: Limit maximum history length
 * description: Limit the maximum number of history records to avoid excessive memory consumption.
 *
 * title.zh-CN: 限制历史记录最大长度
 * description.zh-CN: 限制最大历史记录数量,避免过度占用内存。
 */

import React from 'react';
import { Button, Input, Space } from 'antd';
import { useHistoryTravel } from 'ahooks';

const MAX_LENGTH = 3;

export default () => {
  const { value, setValue, backLength, forwardLength, back, forward } = useHistoryTravel<string>(
    '',
    MAX_LENGTH,
  );

  return (
    <>
      <Space style={{ marginBottom: 8 }}>
        <Input value={value || ''} onChange={(e) => setValue(e.target.value)} />
        <Button disabled={backLength <= 0} onClick={back}>
          back
        </Button>
        <Button disabled={forwardLength <= 0} onClick={forward}>
          forward
        </Button>
      </Space>
      <div>maxLength: {MAX_LENGTH}</div>
      <div>backLength: {backLength}</div>
      <div>forwardLength: {forwardLength}</div>
    </>
  );
};
