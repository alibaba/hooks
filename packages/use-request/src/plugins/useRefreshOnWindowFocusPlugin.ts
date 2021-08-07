import { useEffect, useRef } from 'react';
import type { UseRequestPluginInitContext, UseRequestState, UseRequestPlugin } from '../type';

const useRefreshOnWindowFocusPlugin: UseRequestPlugin = () => {
  const stateRef = useRef<UseRequestState | null>(null);
  const contextRef = useRef<UseRequestPluginInitContext | null>(null);

  useEffect(() => {
    const handleWindowFocus = () => {
      contextRef.current?.run();
    };
    window.addEventListener('focus', handleWindowFocus);
    return () => {
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  return {
    init: (state, context, options) => {
      console.log(options);
      stateRef.current = state;
      contextRef.current = context;
    },
  };
};

export default useRefreshOnWindowFocusPlugin;
