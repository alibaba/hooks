import { useRef, useEffect } from 'react';

type Subscription<T> = (val: T) => void;

export class EventEmitter<T> {
  private subscriptions = new Set<Subscription<T>>();

  emit = (val: T) => {
    for (const subscription of this.subscriptions) {
      subscription(val);
    }
  };

  useSubscription = (subscription: Subscription<T>) => {
    useEffect(() => {
      this.subscriptions.add(subscription);
      return () => {
        this.subscriptions.delete(subscription);
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
