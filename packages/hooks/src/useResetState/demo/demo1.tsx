import React, { useRef } from 'react';
import { useResetState } from 'ahooks';

interface State {
  hello: string;
  value: number;
}

export default () => {
  const initialValue = useRef({
    hello: '',
    value: Math.random(),
  }).current;

  const [state, setState, resetState] = useResetState<State>(() => initialValue);

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <div>initialValue: {JSON.stringify(initialValue, null, 2)}</div>
      <p>
        <button
          type="button"
          style={{ marginRight: '8px' }}
          onClick={() => setState(() => ({ hello: 'world', value: Math.random() }))}
        >
          set hello and value
        </button>

        <button type="button" onClick={resetState}>
          resetState
        </button>
      </p>
    </div>
  );
};
