import { useCallback, useState } from 'react';

/**
 * A hook that returns a function which can be used to force the component to re-render.
 * @see https://ahooks.js.org/hooks/use-update
 */
const useUpdate = () => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
};

export default useUpdate;
