import { useEffect, useRef } from 'react';

function useIteration(
  fn: () => Promise<void>,
  options?: {
    immediate?: boolean;
  },
) {
  const immediate = options?.immediate;
  let running = false;

  const fnRef = useRef<() => void>();
  fnRef.current = fn;

  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return stop;
  }, []);

  const start = (frequency: number) => {
    running = true;
    if (immediate) {
      fnRef.current?.();
    }
    timer.current = setTimeout(async () => {
      await fnRef.current?.();
      running && start(frequency);
    }, frequency);
  };
  const stop = () => {
    running = false;
    if (!timer.current) return;
    clearTimeout(timer.current);
  };
  return { start, stop };
}

export default useIteration;
