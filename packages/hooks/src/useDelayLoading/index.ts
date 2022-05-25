import { useRef, useState } from 'react';

type UseDelayLoading = (initValue: boolean, lazy?: number) => [boolean, (value: boolean) => void];

const useDelayLoading: UseDelayLoading = (initValue, lazy = 200) => {
  const timer = useRef<NodeJS.Timeout>();

  const [loading, setLoading] = useState<boolean>(initValue);

  const setDelayLoading = (value: boolean) => {
    if (timer.current) clearTimeout(timer.current);

    if (!value) {
      setLoading(value);
    } else {
      timer.current = setTimeout(() => setLoading(value), lazy);
    }
  };

  return [loading, setDelayLoading];
};

export default useDelayLoading;
