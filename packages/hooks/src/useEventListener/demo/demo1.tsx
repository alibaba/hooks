import React, { useState } from 'react';
import useEventListener from '../index';

export default () => {
  const [value, setValue] = useState(0);

  const clickHandler = () => {
    setValue(value + 1);
  };

  const ref = useEventListener<HTMLButtonElement>('click', clickHandler);

  return <button ref={ref}>You click {value} times</button>;
};
