import type { DependencyList } from 'react';
import type { BasicTarget } from '../utils/domTarget';

export type Data = { list: any[]; [key: string]: any };

export type Service<TData extends Data> = (currentData?: TData) => Promise<TData>;

export interface InfiniteScrollResult<TData extends Data> {
  data: TData;
  loading: boolean;
  loadingMore: boolean;
  error?: Error;
  noMore: boolean;

  loadMore: () => void;
  loadMoreAsync: () => Promise<TData>;
  reload: () => void;
  reloadAsync: () => Promise<TData>;
  cancel: () => void;
  mutate: (data?: TData) => void;
}

export interface InfiniteScrollOptions<TData extends Data> {
  target?: BasicTarget<Element | Document>;
  isNoMore?: (data?: TData) => boolean;
  threshold?: number;

  manual?: boolean;
  reloadDeps?: DependencyList;

  onBefore?: () => void;
  onSuccess?: (data: TData) => void;
  onError?: (e: Error) => void;
  onFinally?: (data?: TData, e?: Error) => void;
}
