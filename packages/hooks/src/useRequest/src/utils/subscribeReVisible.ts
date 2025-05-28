import isBrowser from '../../../utils/isBrowser';
import isDocumentVisible from './isDocumentVisible';

type Listener = () => void;

const listeners: Listener[] = [];

function subscribe(listener: Listener) {
  listeners.push(listener);
  return function unsubscribe() {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}

if (isBrowser) {
  const revalidate = () => {
    if (!isDocumentVisible()) return;
    const copyListeners = [...listeners];
    for (let i = 0; i < copyListeners.length; i++) {
      const listener = copyListeners[i];
      listener();
    }
  };
  window.addEventListener('visibilitychange', revalidate, false);
}

export default subscribe;
