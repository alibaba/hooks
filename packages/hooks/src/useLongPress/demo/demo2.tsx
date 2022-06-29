import React, { useRef, useState } from 'react';
import { useLongPress } from 'ahooks';

export default () => {
  const [pressCounter, setPressCounter] = useState(0);
  const [clickCounter, setClickCounter] = useState(0);

  const ref = useRef<HTMLButtonElement>(null);

  useLongPress(() => setPressCounter((s) => s + 1), ref, {
    onClick: () => setClickCounter((s) => s + 1),
  });

  return (
    <div>
      <button ref={ref} type="button">
        Press me
      </button>
      <p>pressCounter: {pressCounter}</p>
      <p>clickCounter: {clickCounter}</p>
    </div>
  );
};
