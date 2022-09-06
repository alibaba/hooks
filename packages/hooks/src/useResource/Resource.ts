import type { TStatus, TFetcher } from './type';

export class Resource<R = any, E = any, P extends any[] = any[]> {
  // properties
  private _fetcher: TFetcher<P, R>;
  private _res: R | null;
  private _err: E | null;
  private _status: TStatus;
  // constructor
  constructor(fetcher: TFetcher<P, R>) {
    this._fetcher = fetcher;
    this._res = null;
    this._err = null;
    this._status = 'PENDING';
  }
  // methods
  read(...args: P) {
    if (!this._fetcher) {
      throw new ReferenceError('fetcher does not exist.');
    }
    if (typeof this._fetcher !== 'function' && typeof this._fetcher.then !== 'function') {
      throw new TypeError('the type of fetcher must be promise or function.');
    }
    if (this._status === 'PENDING') {
      if (typeof this._fetcher === 'function') {
        this._fetcher = this._fetcher(...args);
      }
      throw this._fetcher
        .then((res) => ((this._status = 'RESOLVED'), (this._res = res), res))
        .catch((err) => ((this._status = 'REJECTED'), (this._err = err), err));
    }
    if (this._status === 'REJECTED') {
      throw this._err;
    }
    return this._res as R;
  }
}
