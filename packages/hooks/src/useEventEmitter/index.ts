import { useEffect, useRef } from 'react';

type Subscription<T> = (val: T) => void;

export class EventEmitter<T> {
  private subscriptions = new Set<Subscription<T>>();

  emit = (val: T) => {
    for (const subscription of this.subscriptions) {
      subscription(val);
    }
  };

  useSubscription = (callback: Subscription<T>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const callbackRef = useRef<Subscription<T>>(undefined);
    callbackRef.current = callback;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // biome-ignore lint/correctness/useExhaustiveDependencies: A subscriber can receive a different emitter instance through props or context.
    useEffect(() => {
      function subscription(val: T) {
        if (callbackRef.current) {
          callbackRef.current(val);
        }
      }
      this.subscriptions.add(subscription);
      return () => {
        this.subscriptions.delete(subscription);
      };
    }, [this]);
  };
}

const useEventEmitter = <T = void>() => {
  const ref = useRef<EventEmitter<T>>(undefined);
  if (!ref.current) {
    ref.current = new EventEmitter();
  }
  return ref.current;
};

export default useEventEmitter;
