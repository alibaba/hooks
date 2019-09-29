import { useRef, useEffect } from 'react';

type Subscription<T> = (val: T) => void;

export class EventEmitter<T> {
  private subscriptions: Subscription<T>[] = [];

  emit = (val: T) => {
    for (const subscription of this.subscriptions) {
      subscription(val);
    }
  };

  useSubscription = (callback: Subscription<T>) => {
    const callbackRef = useRef<Subscription<T>>();
    callbackRef.current = callback;
    useEffect(() => {
      function subscription(val: T) {
        if (callbackRef.current) {
          callbackRef.current(val);
        }
      }
      this.subscriptions.push(subscription);
      return () => {
        const idx = this.subscriptions.indexOf(subscription);
        this.subscriptions.splice(idx, 1);
      };
    }, []);
  };
}

export default function useEventEmitter<T>() {
  const ref = useRef<EventEmitter<T>>();
  if (!ref.current) {
    ref.current = new EventEmitter();
  }
  return ref.current;
}
