import React, { useMemo } from 'react';
import useMouse from '..';
import useSize from '../../useSize';

export default () => {
  const mouse = useMouse();
  const [rect, ref] = useSize<HTMLDivElement>();

  const inSide =
    rect.top <= mouse.top &&
    rect.top + rect.height >= mouse.top &&
    rect.left <= mouse.left &&
    rect.left + rect.width >= mouse.left;

  return (
    <div>
      Mouse Pos: {JSON.stringify(mouse)}
      <div
        style={{
          width: 200,
          height: 200,
          lineHeight: '200px',
          background: '#e8e8e8',
          textAlign: 'center',
        }}
        ref={ref}
      >
        {inSide ? 'inside' : 'outside'}
      </div>
    </div>
  );
};
