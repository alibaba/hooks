import React from 'react';
import useInViewport from '..';

export default () => {
  const [inViewPort] = useInViewport(() => document.querySelector('#demo2'));
  return (
    <div>
      <div id="demo2">observer dom</div>
      <div style={{ marginTop: 70, color: inViewPort ? '#87d068' : '#f50' }}>
        {inViewPort ? 'visible' : 'hidden'}
      </div>
    </div>
  );
};
