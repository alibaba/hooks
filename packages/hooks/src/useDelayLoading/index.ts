import { useRef, useState } from 'react';
import { useUnmount } from 'ahooks';

type UseDelayLoading = (
  initValue: boolean,
  lazy?: number,
) => [boolean, (value: boolean, immediate?: boolean) => void];

const useDelayLoading: UseDelayLoading = (initValue, lazy = 200) => {
  const timer = useRef<NodeJS.Timeout>();

  const onClearTimer = () => {
    if (timer.current !== undefined) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
  };

  const [loading, setLoading] = useState<boolean>(initValue);

  const setDelayLoading = (value: boolean, immediate: boolean = false) => {
    onClearTimer();
    if (value === false || immediate) {
      setLoading(value);
    } else {
      timer.current = setTimeout(() => setLoading(value), lazy);
    }
  };

  useUnmount(onClearTimer);

  return [loading, setDelayLoading];
};

export default useDelayLoading;
