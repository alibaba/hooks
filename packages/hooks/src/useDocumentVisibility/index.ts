import { useState } from 'react';
import useEventListener from '../useEventListener';

type VisibilityState = 'hidden' | 'visible' | 'prerender' | undefined;

const getVisibility = () => {
  // Default document visibility to true for SSR
  if (typeof document === 'undefined') return true;
  return document.visibilityState;
};

function useDocumentVisibility(): VisibilityState {
  const [documentVisibility, setDocumentVisibility] = useState(() => getVisibility());

  useEventListener(
    'visibilitychange',
    () => {
      setDocumentVisibility(getVisibility());
    },
    {
      target: document,
    },
  );

  return documentVisibility;
}

export default useDocumentVisibility;
