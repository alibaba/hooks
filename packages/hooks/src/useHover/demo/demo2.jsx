import React from 'react';
import useHover from '..';

export default () => {
  const [isHovering] = useHover({
    dom: () => document.getElementById('hover-div'),
    onEnter: () => {
      console.log('onEnter');
    },
    onLeave: () => {
      console.log('onLeave');
    },
  });

  return <div id="hover-div">{isHovering ? 'hover' : 'leaveHover'}</div>;
};
