import { useState, useCallback, useRef } from 'react';

interface IData<T> {
  present?: T;
  past: T[];
  future: T[];
}

const dumpIndex = <T>(step: number, arr: T[]) => {
  let index =
    step > 0
      ? step - 1 // move forward
      : arr.length + step; // move backward
  if (index >= arr.length - 1) {
    index = arr.length - 1;
  }
  if (index < 0) {
    index = 0;
  }
  return index;
};

const split = <T>(step: number, targetArr: T[]) => {
  const index = dumpIndex(step, targetArr);
  return {
    _current: targetArr[index],
    _before: targetArr.slice(0, index),
    _after: targetArr.slice(index + 1)
  };
};

export default function useHistoryTravel<T>(initialValue?: T) {
  const [history, setHistory] = useState<IData<T | undefined>>({
    present: initialValue,
    past: [],
    future: []
  });

  const { present, past, future } = history;

  const initialValueRef = useRef(initialValue);

  const reset = useCallback(
    (...params: any[]) => {
      const _initial = params.length > 0 ? params[0] : initialValueRef.current;
      initialValueRef.current = _initial;

      setHistory({
        present: _initial,
        future: [],
        past: []
      });
    },
    [history, setHistory]
  );

  const updateValue = useCallback(
    (val: T) => {
      setHistory({
        present: val,
        future: [],
        past: [...past, present]
      });
    },
    [history, setHistory]
  );

  const _forward = useCallback(
    (step: number = 1) => {
      if (future.length === 0) {
        return;
      }
      const { _before, _current, _after } = split(step, future);
      setHistory({
        past: [...past, present, ..._before],
        present: _current,
        future: _after
      });
    },
    [history, setHistory]
  );

  const _backward = useCallback(
    (step: number = -1) => {
      if (past.length === 0) {
        return;
      }

      const { _before, _current, _after } = split(step, past);
      setHistory({
        past: _before,
        present: _current,
        future: [..._after, present, ...future]
      });
    },
    [history, setHistory]
  );

  const go = useCallback(
    (step: number) => {
      const stepNum = typeof step === 'number' ? step : Number(step);
      if (stepNum === 0) {
        return;
      }
      if (stepNum > 0) {
        return _forward(stepNum);
      }
      _backward(stepNum);
    },
    [_backward, _forward]
  );

  return {
    value: present,
    setValue: updateValue,
    backLength: past.length,
    forwardLength: future.length,
    go,
    back: useCallback(() => {
      go(-1);
    }, [go]),
    forward: useCallback(() => {
      go(1);
    }, [go]),
    reset
  };
}
