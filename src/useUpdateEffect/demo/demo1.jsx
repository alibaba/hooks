import React, { useState, useEffect, useRef } from 'react';
import { message, Button } from 'antd';
import useUpdateEffect from '..';

export default () => {
  const [count, setCount] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      message.success(`useEffect ${count}`);
    }
  });

  useUpdateEffect(() => {
    message.success(`useUpdateEffect ${count}`);
    return () => {
      // do something
    };
  }); // you can include deps array if necessary

  return (
    <div>
      <p>count: {count}</p>
      <p>
        <Button type="primary" onClick={() => setCount(c => c + 1)}>
          increase
        </Button>
      </p>
    </div>
  );
};
