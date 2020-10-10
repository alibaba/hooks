import { useState } from 'react';
import useEventListener from '../useEventListener';

type VisibilityState = 'hidden' | 'visible' | 'prerender' | undefined;

const getVisibility = () => {
  if (typeof document === 'undefined') return;
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
