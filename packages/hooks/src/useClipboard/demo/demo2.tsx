import React from 'react';
import { useClipboard } from 'ahooks';
import { Input, message } from 'antd';

export default () => {
  const { text, onCopy, isSupport } = useClipboard();

  console.log(isSupport);

  const _onCopy = async (value: string) => {
    await onCopy(value);
    message.success('复制成功');
  };

  return (
    <>
      {isSupport ? (
        <div>
          <Input value={text} allowClear />
          <br />
          <br />
          <span style={{ cursor: 'pointer' }} onClick={() => _onCopy('123')}>
            123
          </span>
        </div>
      ) : (
        <div>Not Support Cilpboard</div>
      )}
    </>
  );
};
