import React from 'react';
import useSize from '..';

export default () => {
  const [state] = useSize(document.querySelector('body'));
  return (
    <div>
      this demo is listening to body size change, try to resize the window instead <br />
      dimensions -- width: {state.width} px, height: {state.height} px
    </div>
  );
};
