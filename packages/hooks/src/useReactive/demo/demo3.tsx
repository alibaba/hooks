import React from 'react';
import { useReactive } from 'ahooks';

export default () => {
  const state = useReactive({
    bug: '',
    bugs: ['feat', 'fix', 'chore'],
    addBug(bug) {
      this.bugs.push(bug);
    },
    get bugsCount() {
      return this.bugs.length;
    },
  });

  return (
    <div>
      <p>state.bugsCount: {state.bugsCount}</p>

      <form
        onSubmit={(e) => {
          state.addBug(state.bug);
          state.bug = '';
          e.preventDefault();
        }}
      >
        <input type="text" value={state.bug} onChange={(e) => (state.bug = e.target.value)} />
        <button type="submit" style={{ marginLeft: '10px' }}>
          Add
        </button>
        <button type="button" style={{ marginLeft: '10px' }} onClick={() => state.bugs.pop()}>
          Delete
        </button>
      </form>

      <br />

      <ul>
        {state.bugs.map((bug) => (
          <li key={bug}>{bug}</li>
        ))}
      </ul>
    </div>
  );
};
