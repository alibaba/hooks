import Cookies from 'js-cookie';
import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

export type State = string | undefined | null;
export interface Options extends Cookies.CookieAttributes {
  defaultValue?: State | (() => State);
}

function useCookieState(cookieKey: string, options: Options = {}) {
  const [state, setState] = useState<State>(() => {
    const cookieValue = Cookies.get(cookieKey);

    if (typeof cookieValue === 'string') return cookieValue;

    if (typeof options.defaultValue === 'function') {
      return options.defaultValue();
    }

    return options.defaultValue;
  });

  const updateState = useMemoizedFn(
    (
      newValue: State | ((prevState: State) => State),
      newOptions: Cookies.CookieAttributes = {},
    ) => {
      const { defaultValue, ...restOptions } = { ...options, ...newOptions };
      setState((prevState) => {
        const value = typeof newValue === 'function' ? newValue(prevState) : newValue;
        if (value === undefined || value === null) {
          Cookies.remove(cookieKey);
        } else {
          Cookies.set(cookieKey, value, restOptions);
        }
        return value;
      });
    },
  );

  return [state, updateState] as const;
}

export default useCookieState;
