import { useState, useCallback } from 'react';
import Cookies from 'js-cookie';

function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

export interface Options extends Cookies.CookieAttributes {
  defaultValue?: CookieState | (() => CookieState);
}

export type CookieState = string | undefined;

function useCookieState(
  cookieKey: string,
  options: Options = {},
): [
  CookieState,
  (
    newValue?: CookieState | ((prevState?: CookieState) => CookieState),
    options?: Cookies.CookieAttributes,
  ) => void,
] {
  const [state, setState] = useState<CookieState>(() => getDefaultValue());

  // 获取defaultValue
  function getDefaultValue(): CookieState {
    const cookieValue = Cookies.get(cookieKey);
    if (cookieValue !== undefined) return cookieValue;
    if (isFunction(options.defaultValue)) return options.defaultValue();
    return options.defaultValue;
  }

  const updateState = useCallback(
    (
      newValue?: CookieState | ((prevState: CookieState) => CookieState),
      updateOption: Cookies.CookieAttributes = {},
    ) => {
      // merge options
      const { defaultValue, ...targetOptions } = { ...options, ...updateOption };
      setState(
        (prevState: CookieState): CookieState => {
          const value = isFunction(newValue) ? newValue(prevState) : newValue;
          if (value === undefined || value === null) {
            Cookies.remove(cookieKey);
          } else {
            Cookies.set(cookieKey, value, targetOptions);
          }
          return value;
        },
      );
    },
    [cookieKey, options],
  );

  return [state, updateState];
}

export default useCookieState;
