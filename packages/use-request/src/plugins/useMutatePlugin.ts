import { useRef } from 'react';
import type { UseRequestPlugin } from '../type';

const useMutatePlugin: UseRequestPlugin = () => {
  const context = useRef<any>(null);

  const mutate = (value) => {
    if (context && context.current) {
      context.current.setData(value);
    }
  };

  return {
    init: (state, ctx) => {
      context.current = ctx;
    },
    returns: {
      mutate,
    },
  };
};

export default useMutatePlugin;
