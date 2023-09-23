import { useEffect, useRef, useState } from 'react';

type Observer<T> = (value: T) => void;

class Observable<T> {
  private observers: Observer<T>[] = [];

  subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer<T>): void {
    this.observers = this.observers.filter((subscriber) => subscriber !== observer);
  }

  notify(data: T): void {
    this.observers.forEach((observer) => observer(data));
  }
}

export type PublisherStateType<T> = {
  current: T;
  observable: Observable<string>;
};
type SetPublisherStateType<T> = (newVal: T | ((newVal: T) => T), needUpdate?: boolean) => void;

export function usePublisherState<T>(initialState: T) {
  const stateRef = useRef<PublisherStateType<T>>({
    current: initialState,
    observable: new Observable<string>(),
  });

  const setState: SetPublisherStateType<T> = (
    newVal: T | ((oldVal: T) => T),
    needUpdate = true,
  ) => {
    if (typeof newVal === 'function') {
      stateRef.current.current = (newVal as (newVal: T) => T)(stateRef.current.current);
      if (needUpdate) stateRef.current.observable.notify('update');
    } else if (stateRef.current.current !== newVal) {
      stateRef.current.current = newVal;
      if (needUpdate) stateRef.current.observable.notify('update');
    }
  };

  return [stateRef.current, setState] as const;
}

export function useSubscriberState<T>(state?: PublisherStateType<T>) {
  const [, forceUpdate] = useState({});
  const update = () => forceUpdate({});
  useEffect(() => {
    if (!state) return;
    const observer: Observer<string> = (info) => {
      if (info === 'update') update();
    };
    state.observable.subscribe(observer);

    return () => {
      state.observable.unsubscribe(observer);
    };
  }, [state]);

  return state?.current;
}
