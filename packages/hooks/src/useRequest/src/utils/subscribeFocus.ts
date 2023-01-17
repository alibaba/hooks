// from swr
import isBrowser from '../../../utils/isBrowser';
import isDocumentVisible from './isDocumentVisible';
import isOnline from './isOnline';

export type FocusEvent = 'visibilitychange' | 'focus';
type Listener = {
  type: FocusEvent;
  fn: () => void;
};

export const defaultFocusEvents: FocusEvent[] = ['visibilitychange', 'focus'];
const listeners: Listener[] = [];

function subscribe(listener: Listener['fn'], focusEvent: FocusEvent[] = defaultFocusEvents) {
  focusEvent.forEach((type) => {
    listeners.push({ type, fn: listener });
  });

  return function unsubscribe() {
    const index = listeners.findIndex(
      (ele) => ele.fn === listener && focusEvent.includes(ele.type),
    );
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}

if (isBrowser) {
  const revalidate = (type: FocusEvent) => {
    console.info('??????', type);
    if (!isDocumentVisible() || !isOnline()) return;
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      if (listener.type === type) {
        listener.fn();
      }
    }
  };

  defaultFocusEvents.forEach((type) => {
    // should bind event to document instead of window, see https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event
    document.addEventListener(type, () => revalidate(type), false);
  });
}

export default subscribe;
