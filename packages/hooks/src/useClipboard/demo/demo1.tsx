import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useClipboard } from 'ahooks';

export default () => {
  const { text, onCopy, isSupport } = useClipboard();
  const [value, setValue] = useState('');

  console.log(isSupport);
  return (
    <>
      {isSupport ? (
        <div>
          <span>{text || 'copy之前的数值'}</span>
          <br />
          <br />
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
          <br />
          <br />
          <Button style={{ width: 100 }} onClick={() => onCopy(value)}>
            Copy
          </Button>
        </div>
      ) : (
        <div>Not Support Cilpboard</div>
      )}
    </>
  );
};
