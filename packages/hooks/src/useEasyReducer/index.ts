import { useReducer, useMemo } from 'react';

type Processers<T> = Record<string, (state: T, payload?: any) => T>;

type Dispatcher<T, P extends Processers<T>> = {
  [key in keyof P]: P[key] extends (state: T, ...args: infer TP) => void
    ? (...args: TP) => void
    : never;
};

export default function useEasyReducer<T, P extends Processers<T>>(
  processers: P,
  initializer: (...args: any[]) => T,
): [T, Dispatcher<T, P>] {
  function reducer(state: T, action: { type: keyof P; payload?: any }) {
    const { type, payload } = action;
    const processer = processers[type];

    if (!processer) {
      throw new Error('invalid action type');
    }

    return processer(state, payload);
  }

  const [state, dispatch] = useReducer(reducer, undefined, initializer);

  const dispatcher = useMemo(
    () =>
      Object.keys(processers).reduce(
        (prev, current) => ({
          ...prev,
          [current]: (payload?: any) => {
            dispatch({ type: current, payload });
          },
        }),
        {},
      ) as Dispatcher<T, P>,
    [processers],
  );

  return [state, dispatcher];
}
