import React, { useEffect, useState } from 'react';

export interface cursorState {
  left: number;
  top: number;
}

const initState: cursorState = {
  left: 0,
  top: 0,
};

export default () => {
  const [state, setState] = useState(initState);

  useEffect(() => {
    const moveHandler = (event: MouseEvent) => {
      console.log('change', event);
      setState({
        left: event.pageX,
        top: event.pageY,
      });
    };

    document.addEventListener('mousemove', moveHandler);
    return () => {
      document.removeEventListener('mousemove', moveHandler);
    };
  }, []);

  return state;
};
