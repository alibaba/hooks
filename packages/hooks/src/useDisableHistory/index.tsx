import { useEffect } from 'react';

export interface IUseDisableHistory {
  callback?: (url: string) => void;
  url?: string;
  shouldRefresh?: boolean;
}

// disable browser history
const useDisableHistory = (props?: IUseDisableHistory) => {
  const { callback, url = document.URL, shouldRefresh = false } = props || {};
  useEffect(() => {
    window.history.pushState(null, '', url);
    const popstateCb = () => {
      // disabled history action
      window.history.pushState(null, '', url);
      // If shouldRefresh is true, refresh current page
      if (shouldRefresh) {
        window.location.replace(url);
      }
      callback?.(url);
    };
    window.addEventListener('popstate', popstateCb);
    return () => {
      window.removeEventListener('popstate', popstateCb);
    };
  }, []);
};

export default useDisableHistory;
