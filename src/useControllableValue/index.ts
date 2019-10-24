import { useMemo, useState, useCallback } from 'react';
import useUpdateEffect from '../useUpdateEffect';

export interface Options {
  defaultValuePropName?: string;
  valuePropName?: string;
  trigger?: string;
}

export interface Props {
  [key: string]: any;
}

export default function useControllableValue<T>(props: Props = {}, options: Options = {}) {
  const {
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
  } = options;

  const defaultValue = props[defaultValuePropName];
  const value = props[valuePropName];

  const initialValue = useMemo(() => {
    if (valuePropName in props) {
      return value;
    }
    if (defaultValuePropName in props) {
      return defaultValue;
    }
    return undefined;
  }, []);

  const [state, setState] = useState<T>(initialValue);

  /* init 的时候不用执行了 */
  useUpdateEffect(() => {
    if (valuePropName in props) {
      setState(value);
    }
  }, [value]);

  const handleSetState = useCallback(
    (v: T) => {
      if (!(valuePropName in props)) {
        setState(v);
      }
      if (props[trigger]) {
        props[trigger](v);
      }
    },
    [props, valuePropName, trigger],
  );

  return [state, handleSetState] as const;
}
