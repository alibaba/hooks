import React from 'react';
import useHover from '..';

export default () => {
  const [isHovering, hoverRef] = useHover<HTMLDivElement>();
  return <div ref={hoverRef}>{isHovering ? 'hover' : 'leaveHover'}</div>;
};
