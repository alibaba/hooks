import { useRef, useEffect } from 'react';

const DEFAULT_SUBSCRIPTION_NAME = 'useEventEmitter-Default-Name';

type Subscription<T> = (val: T) => void;

export class EventEmitter<T> {
  // private subscriptions = new Set<Subscription<T>>();
  private subscriptions = new Object();

  emit = (val: T, name?: string) => {
    const subscriptions = this.subscriptions[name || DEFAULT_SUBSCRIPTION_NAME];
    const result: any[] = [];
    if (subscriptions) {
      subscriptions.forEach((s: Subscription<T>) => {
        result.push(s.call(this, val));
      });
    }
    return result;
  };

  asyncEmit = async (val: T, name?: string) => {
    const subscriptions = this.subscriptions[name || DEFAULT_SUBSCRIPTION_NAME];
    const result: any[] = [];
    if (subscriptions) {
      for (let i = 0; i < subscriptions.length; i++) {
        const s = subscriptions[i];
        result.push(await s.call(this, val));
      }
    }
    return result;
  };
  useSubscription = (callback: Subscription<T>, name?: string, deps?: any[]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      (
        this.subscriptions[name || DEFAULT_SUBSCRIPTION_NAME] ||
        (this.subscriptions[name || DEFAULT_SUBSCRIPTION_NAME] = [])
      ).push(callback);
      return () => {
        this.subscriptions[name || DEFAULT_SUBSCRIPTION_NAME] = null;
      };
    }, deps || []);
  };
}

export default function useEventEmitter<T = void>() {
  const ref = useRef<EventEmitter<T>>();
  if (!ref.current) {
    ref.current = new EventEmitter();
  }
  return ref.current;
}
