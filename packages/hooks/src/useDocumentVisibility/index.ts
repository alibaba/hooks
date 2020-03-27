import { useState, useEffect } from 'react';

type VisibilityState = 'hidden' | 'visible' | 'prerender' | boolean;

const getVisibility = () => {
  // 如果是服务端渲染，直接返回true
  if (typeof document === 'undefined') return true;
  return document.visibilityState;
}

function useDocumentVisibility():VisibilityState {
  const [documentVisibility, setDocumentVisibility] = useState(getVisibility());

  useEffect(() => {
    const handleVisibilityChange = () => {
      setDocumentVisibility(getVisibility());
    }
    window.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return documentVisibility
}

export default useDocumentVisibility;
