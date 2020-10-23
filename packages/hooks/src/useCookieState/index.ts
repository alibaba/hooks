import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';
import { isFunction } from '../utils';

// TODO ts 命名不规范，待下个大版本修复
export type TCookieState = string | undefined | null;
export type TCookieOptions = Cookies.CookieAttributes;

export interface IOptions extends TCookieOptions {
  defaultValue?: TCookieState | (() => TCookieState);
}

function useCookieState(cookieKey: string, options: IOptions = {}) {
  const [state, setState] = useState<TCookieState>(() => {
    const cookieValue = Cookies.get(cookieKey);
    if (typeof cookieValue === 'string') return cookieValue;

    if (isFunction(options.defaultValue)) return options.defaultValue();
    return options.defaultValue;
  });

  // usePersistFn 保证返回的 updateState 不会变化
  const updateState = useCallback(
    (
      newValue?: TCookieState | ((prevState: TCookieState) => TCookieState),
      newOptions: Cookies.CookieAttributes = {},
    ) => {
      const { defaultValue, ...restOptions } = { ...options, ...newOptions };
      setState(
        (prevState: TCookieState): TCookieState => {
          const value = isFunction(newValue) ? newValue(prevState) : newValue;
          if (value === undefined || value === null) {
            Cookies.remove(cookieKey);
          } else {
            Cookies.set(cookieKey, value, restOptions);
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
