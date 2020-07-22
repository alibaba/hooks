import { useState, useCallback } from 'react';
import Cookies from 'js-cookie';

function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

export interface IOptions extends Cookies.CookieAttributes {
  defaultValue?: TCookieState | ((cookieState?: string) => TCookieState);
}

export type TCookieState = string | null | undefined;

export type TCookieOptions = Cookies.CookieAttributes;

function useCookieState(cookieKey: string, options?: IOptions) {
  const [state, setState] = useState<TCookieState>(() => {
    const cookieValue = Cookies.get(cookieKey);
    if (cookieValue) return cookieValue;
    if (options && options.defaultValue) {
      if (isFunction(options.defaultValue)) return options.defaultValue();
      return options.defaultValue;
    }
    return null;
  });

  const updateState = useCallback(
    (
      newValue?: string | ((prevState: TCookieState) => TCookieState),
      option?: Cookies.CookieAttributes,
    ) => {
      const { defaultValue, ...cookieOptions } = option || options || {};
      setState(
        (prevState: TCookieState): TCookieState => {
          const value = isFunction(newValue) ? newValue(prevState) : newValue;
          if (value === undefined || value === null) {
            Cookies.remove(cookieKey);
          } else {
            Cookies.set(cookieKey, value, cookieOptions);
          }
          return value;
        },
      );
    },
    [cookieKey, options],
  );

  return [state, updateState] as const;
}

export default useCookieState;
