import { useState } from 'react';

const useSomePlugin = () => {
  const [state, setState] = useState(0);

  const onSuccess = () => {
    setState((s) => s + 1);
  };

  const onError = () => {
    setState((s) => s - 1);
  };

  return {
    onSuccess,
    onError,
    returns: {
      successCount: state,
    },
  };
};

export default useSomePlugin;
