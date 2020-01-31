import React from 'react';
import useHover from '..';

export default () => {
  const [isHovering, hoverRef] = useHover();

  return <div ref={hoverRef}>{isHovering ? 'hover' : 'leaveHover'}</div>;
};
