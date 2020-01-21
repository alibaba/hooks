import React from 'react';
import useSize from '..';

export default () => {
  const [state] = useSize(() => document.querySelector('#demo2'));
  return (
    <div id="demo2">
      try to resize the preview window <br />
      dimensions -- width: {state.width} px, height: {state.height} px
    </div>
  );
};
