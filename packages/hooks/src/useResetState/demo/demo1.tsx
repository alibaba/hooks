import React from 'react';
import { useResetState } from 'ahooks';

interface State {
  hello: string;
  value: number;
}

const initialValue = {
  hello: '',
  value: Math.random(),
};

export default () => {
  const [state, setState, resetState] = useResetState<State>(initialValue);

  return (
    <div>
      <div>initial state:</div>
      <pre>{JSON.stringify(initialValue, null, 2)}</pre>
      <div>current state:</div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
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
