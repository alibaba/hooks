import { useCallback, useState } from 'react';

const useUpdate = () => {
  const [, setState] = useState(0);

  return useCallback(() => setState((num: number): number => num + 1), []);
};

export default useUpdate;
