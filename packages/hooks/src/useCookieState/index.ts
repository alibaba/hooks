import Cookies from 'js-cookie';
import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import useUpdateEffect from '../useUpdateEffect';
import { isFunction, isString, isUndef } from '../utils';

export type State = string | undefined;

export interface Options extends Cookies.CookieAttributes {
  defaultValue?: State | (() => State);
}

function useCookieState(cookieKey: string, options: Options = {}) {
  function getDefaultValue() {
    return isFunction(options?.defaultValue) ? options?.defaultValue() : options?.defaultValue;
  }

  function setStoredValue(newValue: State, newOptions: Cookies.CookieAttributes = {}) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { defaultValue, ...restOptions } = newOptions;

    if (isUndef(newValue)) {
      Cookies.remove(cookieKey);
    } else {
      Cookies.set(cookieKey, newValue, restOptions);
    }
  }

  function getStoredValue() {
    const cookieValue = Cookies.get(cookieKey);

    if (isString(cookieValue)) return cookieValue;

    const defaultValue = getDefaultValue();

    setStoredValue(defaultValue);

    return defaultValue;
  }

  const [state, setState] = useState<State>(() => getStoredValue());

  useUpdateEffect(() => {
    setState(getStoredValue());
  }, [cookieKey]);

  const updateState = useMemoizedFn(
    (
      newValue: State | ((prevState: State) => State),
      newOptions: Cookies.CookieAttributes = {},
    ) => {
      const currentValue = isFunction(newValue) ? newValue(state) : newValue;

      setState(currentValue);
      setStoredValue(currentValue, newOptions);
    },
  );

  return [state, updateState] as const;
}

export default useCookieState;
