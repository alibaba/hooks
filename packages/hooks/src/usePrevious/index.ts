import { useRef } from 'react';

export type ShouldUpdateFunc<T> = (prev?: T, next?: T) => boolean;

const defaultShouldUpdate = <T>(a?: T, b?: T) => !Object.is(a, b);

function usePrevious<T>(
  state: T,
  shouldUpdate: ShouldUpdateFunc<T> = defaultShouldUpdate,
): T | undefined {
  const prevRef = useRef<T>(undefined);
  const curRef = useRef<T>(undefined);

  if (shouldUpdate(curRef.current, state)) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
}

export default usePrevious;
