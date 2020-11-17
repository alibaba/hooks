import { useState } from 'react';
import useEventListener from '../useEventListener';

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

  useEventListener(
    'mousemove',
    (event: MouseEvent) => {
      const { screenX, screenY, clientX, clientY, pageX, pageY } = event;
      setState({ screenX, screenY, clientX, clientY, pageX, pageY });
    },
    {
      target: document,
    },
  );

  return state;
};
