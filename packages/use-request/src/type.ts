export type RunImplement = Function;
export type UseRequestState<T = any> = {
  data: T;
  loading: boolean;
  error: Error;
};

type UseRequestReturn<T = any, P = any> = {
  data: T;
  loading: boolean;
  error: Error;
  defaultParams: P;
  run: (params: P) => void;
  runAsync: (params: P) => Promise<T>;
  [pluginReturns: string]: any;
};
export type UseRequest<T = any, P = any> = (
  fetcher: (...args) => Promise<T>,
  options: Partial<TUseRequestOptions<P>>,
) => UseRequestReturn;

export type UseRequestPluginInitContext = {
  run: RunImplement;
  setData: any;
  setSuspended: (suspend: boolean) => void;
};

export type UseRequestPluginReturn<T = any, R = any, P = any> = {
  run?: (runImplement: RunImplement) => RunImplement;
  init?: (
    state: UseRequestState<T>,
    context: UseRequestPluginInitContext,
    options: TUseRequestOptions<P>,
  ) => void;
  onSuccess?: (params: any, res: R) => void | Promise<void>;
  onError?: (params: any, err: Error) => void | Promise<void>;
  onBefore?: (params: any) => void | Promise<void>;
  onComplete?: (params: any) => void | Promise<void>;
  returns?: Record<string, any>;
};

export type UseRequestPlugin<P = any> = (params: P) => UseRequestPluginReturn;

export type TUseRequestOptions<P> = {
  plugins: UseRequestPlugin[];
  defaultParams: P;
  suspense: undefined | boolean;
};

// declare function useRequest(fetcher: Promise<T>, options: useRequestOptions): useRequestReturn;
// export type useRequest<T> = (fetcher: Promise<T>, options: useRequestOptions) => useRequestReturn;
