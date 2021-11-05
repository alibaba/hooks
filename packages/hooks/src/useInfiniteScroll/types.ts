import type { DependencyList } from 'React';
import type { BasicTarget } from '../utils/dom2';

export type Data = { list: any[]; [key: string]: any };

export type Service<TData extends Data> = (currentData?: TData) => Promise<TData>;

export interface InfiniteSrollResult<TData extends Data> {
  data: TData;
  loading: boolean;
  loadingMore: boolean;
  noMore: boolean;

  loadMore: () => void;
  loadMoreAsync: () => Promise<TData>;
  reload: () => void;
  reloadAsync: () => Promise<TData>;
  cancel: () => void;
  mutate: (data?: TData) => void;
}

export interface InfiniteSrollOptions<TData extends Data> {
  target?: BasicTarget;
  isNoMore?: (data?: TData) => boolean;
  threshold?: number;

  manual?: boolean;
  reloadDeps?: DependencyList;

  onBefore?: () => void;
  onSuccess?: (data: TData) => void;
  onError?: (e: Error) => void;
  onFinally?: (data?: TData, e?: Error) => void;
}
