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
  const [state, setState] = useState<State>(() => {
    const cookieValue = Cookies.get(cookieKey);

    if (isString(cookieValue)) return cookieValue;

    if (isFunction(options.defaultValue)) {
      return options.defaultValue();
    }

    return options.defaultValue;
  });
  const [mergedOptions, setMergedOptions] = useState<Options>(options);

  const updateState = useMemoizedFn(
    (
      newValue: State | ((prevState: State) => State),
      newOptions: Cookies.CookieAttributes = {},
    ) => {
      setState(newValue);
      setMergedOptions({ ...options, ...newOptions });
    },
  );

  useUpdateEffect(() => {
    const { defaultValue, ...restOptions } = mergedOptions;

    if (isUndef(state)) {
      Cookies.remove(cookieKey);
    } else {
      Cookies.set(cookieKey, state, restOptions);
    }
  }, [state]);

  return [state, updateState] as const;
}

export default useCookieState;
