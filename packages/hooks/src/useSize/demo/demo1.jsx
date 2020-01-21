import React from 'react';
import useSize from '..';

export default () => {
  const [state, ref] = useSize();
  return (
    <div ref={ref}>
      try to resize the preview window <br />
      dimensions -- width: {state.width} px, height: {state.height} px
    </div>
  );
};
