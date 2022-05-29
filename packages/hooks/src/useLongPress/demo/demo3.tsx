import React, { useRef, useState } from 'react';
import { useLongPress } from 'ahooks';

export default () => {
  const [pressCounter, setPressCounter] = useState(0);

  const ref = useRef<HTMLButtonElement>(null);

  useLongPress(() => setPressCounter((s) => s + 1), ref, {
    moveThreshold: { x: 30, y: 30 },
  });

  return (
    <div>
      <button ref={ref} type="button">
        Press me
      </button>
      <p>counter: {pressCounter}</p>
    </div>
  );
};
