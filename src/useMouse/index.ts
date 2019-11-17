import React, { useEffect, useState } from 'react';

export interface CursorState {
  screenX: number;
  screenY: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
}

const initState: CursorState = {
  screenX: NaN,
  screenY: NaN,
  clientX: NaN,
  clientY: NaN,
  pageX: NaN,
  pageY: NaN,
};

export default () => {
  const [state, setState] = useState(initState);

  useEffect(() => {
    const moveHandler = (event: MouseEvent) => {
      setState({
        screenX: event.screenX,
        screenY: event.screenY,
        clientX: event.clientX,
        clientY: event.clientY,
        pageX: event.pageX,
        pageY: event.pageY,
      });
    };
    document.addEventListener('mousemove', moveHandler);
    return () => {
      document.removeEventListener('mousemove', moveHandler);
    };
  }, []);

  return state;
};
