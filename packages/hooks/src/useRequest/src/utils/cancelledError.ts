const CANCELLED_ERROR_FLAG = '__AHOOKS_CANCELLED_ERROR__';

interface PendingPromiseRef {
  current: ((reason?: any) => void) | undefined;
}

/**
 * Rejection reason used when `useRequest` ignores a request, either because
 * `cancel()` was called (or the component unmounted), or because a newer call superseded it.
 *
 * It is swallowed by `run`/`refresh`, by `options.onError` and by the plugin `onError`
 * handlers, so it only surfaces to code that awaits `runAsync`/`refreshAsync` directly.
 */
export class CancelledError extends Error {
  /** Marker that survives duplicated copies of the module, unlike `instanceof`. */
  readonly [CANCELLED_ERROR_FLAG] = true;

  constructor(message = 'useRequest: the request was cancelled or superseded.') {
    super(message);
    this.name = 'CancelledError';
    // keep `instanceof` working when the class is downleveled
    Object.setPrototypeOf(this, CancelledError.prototype);
  }
}

export function isCancelledError(error: unknown): error is CancelledError {
  return (
    error instanceof CancelledError ||
    (typeof error === 'object' &&
      error !== null &&
      (error as Record<string, unknown>)[CANCELLED_ERROR_FLAG] === true)
  );
}

export function cancelPendingPromise(pendingRejectRef: PendingPromiseRef) {
  pendingRejectRef.current?.(new CancelledError());
  pendingRejectRef.current = undefined;
}
