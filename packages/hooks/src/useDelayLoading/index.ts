import { useRef, useState } from 'react';

type IUseTimeOutLoading = (
  initValue: boolean,
  lazy?: number,
) => [boolean, (value: boolean) => void];

const useDelayLoading: IUseTimeOutLoading = (initValue, Lazy = 200) => {
  const timer = useRef<NodeJS.Timeout>();

  const [loading, setLoading] = useState<boolean>(initValue);

  const setValueTimeOut = (value: boolean) => {
    if (timer.current) clearTimeout(timer.current);

    if (!value) {
      setLoading(value);
    } else {
      timer.current = setTimeout(() => setLoading(value), Lazy);
    }
  };

  return [loading, setValueTimeOut];
};

export default useDelayLoading;
