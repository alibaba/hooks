// from swr
function isDocumentVisible(): boolean {
  if (
    typeof document !== 'undefined' &&
    typeof document.visibilityState !== 'undefined'
  ) {
    return document.visibilityState !== 'hidden'
  }
  return true
}

function isOnline(): boolean {
  if (typeof navigator.onLine !== 'undefined') {
    return navigator.onLine
  }
  return true
}


let listeners: any[] = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  return function unsubscribe() {
    const index = listeners.indexOf(listener)
    listeners.splice(index, 1)
  }
}

let eventsBinded = false
if (typeof window !== 'undefined' && window.addEventListener && !eventsBinded) {
  const revalidate = () => {
    if (!isDocumentVisible() || !isOnline()) return
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  window.addEventListener('visibilitychange', revalidate, false)
  window.addEventListener('focus', revalidate, false)
  // only bind the events once
  eventsBinded = true
}

export default subscribe;