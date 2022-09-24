import React, { useEffect } from 'react';
import { Input } from 'antd';
import useHash from '../useHash';

const Demo = () => {
  const [hash, setHash] = useHash();

  useEffect(() => {
    setHash('#list');
  }, []);
  return (
    <>
      <p>window.location.href: {window.location.href}</p>
      <p>Edit hash: </p>
      <Input value={hash} onChange={(e) => setHash(e.target.value)} />
    </>
  );
};

export default Demo;
