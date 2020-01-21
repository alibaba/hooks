import React from 'react';
import useScroll from '..';

export default () => {
  const [scroll] = useScroll(document);
  return (
    <>
      <div>{JSON.stringify(scroll)}</div>
    </>
  );
};
