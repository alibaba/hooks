import { useCallback, useState } from 'react';

const useToggle = (defaultValue: any = false, reverseValue?: any) => {
  const [state, setState] = useState(defaultValue);

  const toggle = useCallback(
    (value?: any) => {
      // 强制返回状态值，适用于点击操作
      if (value !== undefined) {
        setState(value);
        return;
      }
      // useBoolean
      if (reverseValue === undefined) {
        setState((s: any) => !s);
        return;
      }
      const data = state === defaultValue ? reverseValue : defaultValue;
      setState(data);
    },
    [state],
  );

  return [state, toggle];
};

export default useToggle;
