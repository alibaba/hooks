export function isDocumentVisible(): boolean {
  if (typeof document !== 'undefined' && typeof document.visibilityState !== 'undefined') {
    return document.visibilityState !== 'hidden';
  }
  return true;
}

export function isOnline(): boolean {
  if (typeof navigator.onLine !== 'undefined') {
    return navigator.onLine;
  }
  return true;
}
