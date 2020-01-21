import React, { useState } from 'react';
import useKeyPress from '..';

export default () => {
  const [text, setText] = useState('');
  const [textRef, setTextRef] = useState('');
  const [textSync, setTextSync] = useState('');
  useKeyPress(
    'enter',
    (event: any) => {
      const { value } = event.target;
      setText(value);
    },
    {
      events: ['keyup'],
      target: () => document.getElementById('input'),
    },
  );

  const InputRef = useKeyPress('enter', (event: any) => {
    const { value } = event.target;
    setTextRef(value);
  });

  // Make sure the DOM exists
  useKeyPress(
    () => true,
    (event: any) => {
      const { value } = event.target;
      setTextSync(value);
    },
    {
      events: ['keyup'],
      target: document.getElementById('input2'),
    },
  );

  return (
    <div>
      <div>
        <p>Input and pressing enter: {text}</p>
        <input id="input" style={{ width: 300, marginRight: 24 }} />
      </div>
      <div style={{ marginTop: 24 }}>
        <p>Input and pressing enter: {textRef}</p>
        <input ref={InputRef} style={{ width: 300, marginRight: 24 }} />
      </div>
      <div style={{ marginTop: 24 }}>
        <p>Input after enter change: {textSync}</p>
        <input id="input2" style={{ width: 300, marginRight: 24 }} />
      </div>
    </div>
  );
};
