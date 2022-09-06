export type TStatus = 'PENDING' | 'RESOLVED' | 'REJECTED';

export type TFetcher<P extends any[], R> = Promise<R> | ((...args: P) => Promise<R>);
