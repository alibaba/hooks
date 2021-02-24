import { useMemo, useState } from 'react';
import useCreation from '../useCreation';

export interface Options {
  min?: number;
  max?: number;
}

export interface Actions {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  set: (value: number | ((c: number) => number)) => void;
  reset: () => void;
}

export type ValueParam = number | ((c: number) => number);

function getTargetValue(val: number, options: Options = {}) {
  const { min, max } = options;
  let target = val;
  if (typeof max === 'number') {
    target = Math.min(max, target);
  }
  if (typeof min === 'number') {
    target = Math.max(min, target);
  }
  return target;
}

function useCounter(initialValue: number = 0, options: Options = {}) {
  const { min, max } = options;

  // get init value
  const init = useCreation(() => {
    return getTargetValue(initialValue, {
      min,
      max,
    });
  }, []);

  const [current, setCurrent] = useState(init);

  const actions = useMemo(() => {
    const setValue = (value: ValueParam) => {
      setCurrent((c) => {
        // get target value
        let target = typeof value === 'number' ? value : value(c);
        return getTargetValue(target, {
          max,
          min,
        });
      });
    };
    const inc = (delta: number = 1) => {
      setValue((c) => c + delta);
    };
    const dec = (delta: number = 1) => {
      setValue((c) => c - delta);
    };
    const set = (value: ValueParam) => {
      setValue(value);
    };
    const reset = () => {
      setValue(init);
    };
    return { inc, dec, set, reset };
  }, [init, max, min]);

  return [current, actions] as const;
}

export default useCounter;
