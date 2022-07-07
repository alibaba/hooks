import React from 'react';
import { useClipboard } from 'ahooks';
import { Button, message } from 'antd';

export default () => {
  const { text, onCopy, isSupport } = useClipboard({
    source: '444',
  });

  console.log(isSupport);

  const _onCopy = async () => {
    await onCopy();
    message.success('复制成功');
  };

  return (
    <>
      {isSupport ? (
        <div>
          <span>{text}</span>
          <br />
          <br />
          <Button onClick={() => _onCopy()}>Copy</Button>
        </div>
      ) : (
        <div>Not Support Cilpboard</div>
      )}
    </>
  );
};
