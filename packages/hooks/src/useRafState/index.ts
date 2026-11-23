import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useRef, useState } from 'react';
import useUnmount from '../useUnmount';

function useRafState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
function useRafState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

function useRafState<S>(initialState?: S | (() => S)) {
  const frame = useRef(0);
  const updates = useRef<SetStateAction<S | undefined>[]>([]);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback((update: SetStateAction<S | undefined>) => {
    cancelAnimationFrame(frame.current);
    updates.current.push(update);

    frame.current = requestAnimationFrame(() => {
      const queued = updates.current;
      updates.current = [];
      setState((previous) => {
        let next = previous;
        for (const action of queued) {
          next =
            typeof action === 'function'
              ? (action as (value: S | undefined) => S | undefined)(next)
              : action;
        }
        return next;
      });
    });
  }, []);

  useUnmount(() => {
    cancelAnimationFrame(frame.current);
    updates.current = [];
  });

  return [state, setRafState] as const;
}

export default useRafState;
