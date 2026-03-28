type Listener = (data: any) => void;
const listeners: Record<string, Listener[]> = {};

const trigger = (key: string, data: any) => {
  if (listeners[key]) {
    listeners[key].forEach((item) => item(data));
  }
};

const subscribe = (key: string, listener: Listener) => {
  if (!listeners[key]) {
    listeners[key] = [];
  }
  listeners[key].push(listener);

  return function unsubscribe() {
    const index = listeners[key].indexOf(listener);
    listeners[key].splice(index, 1);
  };
};

type LoadingListener = () => void;
const loadingListeners: Record<string, LoadingListener[]> = {};

const triggerLoading = (key: string) => {
  if (loadingListeners[key]) {
    loadingListeners[key].forEach((item) => item());
  }
};

const subscribeLoading = (key: string, listener: LoadingListener) => {
  if (!loadingListeners[key]) {
    loadingListeners[key] = [];
  }
  loadingListeners[key].push(listener);

  return function unsubscribeLoading() {
    const index = loadingListeners[key].indexOf(listener);
    if (index > -1) {
      loadingListeners[key].splice(index, 1);
    }
  };
};

export { trigger, subscribe, triggerLoading, subscribeLoading };
