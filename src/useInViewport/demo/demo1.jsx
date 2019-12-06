import React from 'react';
import useInViewport from '..';

export default () => {
  const [inViewPort, ref] = useInViewport();

  return (
    <div>
      <div ref={ref}>observer dom</div>
      <div style={{ marginTop: 60, color: inViewPort ? '#87d068' : '#f50' }}>
        {inViewPort ? 'visible' : 'hidden'}
      </div>
    </div>
  );
};
