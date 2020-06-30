import { useState, useCallback } from 'react';
import Cookies from 'js-cookie';

function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

export interface IOptions extends Cookies.CookieAttributes {
  defaultValue?: string | (() => string);
}

function useCookieState(
  cookieKey: string,
  options?: IOptions,
): [
  string | null,
  (
    newValue?: string | ((prevState: string) => string | null),
    options?: Cookies.CookieAttributes,
  ) => void,
] {
  const [state, setState] = useState<string | null>(() => getDefaultValue());

  // 获取defaultValue
  function getDefaultValue(): string | null {
    const cookieValue = Cookies.get(cookieKey);
    if (cookieValue) return cookieValue;
    if (options && options.defaultValue) {
      if (isFunction(options.defaultValue)) return options.defaultValue();
      return options.defaultValue;
    }
    return null;
  }

  const updateState = useCallback(
    (
      newValue?: string | ((prevState: string) => string | null),
      option: Cookies.CookieAttributes = options,
    ) => {
      const { defaultValue, ...cookieOptions } = option;
      if (newValue === undefined || newValue === null) {
        Cookies.remove(cookieKey);
        setState(null);
      } else if (isFunction(newValue)) {
        const currentState = newValue(Cookies.get(cookieKey) || getDefaultValue());
        Cookies.set(cookieKey, currentState, cookieOptions);
        setState(currentState);
      } else {
        Cookies.set(cookieKey, newValue, cookieOptions);
        setState(newValue);
      }
    },
    [cookieKey, options],
  );

  return [state, updateState];
}

export default useCookieState;
