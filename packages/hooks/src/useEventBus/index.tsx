import { useEffect } from 'react';
import Bus from '../Bus';

export const useEventBus = (callbackName: string, callback: Function, deps?: any[]) => {
  useEffect(() => {
    Bus.$on(callbackName, callback);
    return () => {
      Bus.$off(callbackName);
    };
  }, deps || []);

  return [];
};

export default useEventBus;
