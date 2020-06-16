import { useState, useEffect } from 'react';

type VisibilityState = 'hidden' | 'visible' | 'prerender' | undefined;

const getVisibility = () => {
  if (typeof document === 'undefined') return;
  return document.visibilityState;
};

function useDocumentVisibility(): VisibilityState {
  const [documentVisibility, setDocumentVisibility] = useState(getVisibility());

  useEffect(() => {
    const handleVisibilityChange = () => {
      setDocumentVisibility(getVisibility());
    };
    window.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return documentVisibility;
}

export default useDocumentVisibility;
