import useAsync from '../useAsync';

interface IProps<T> {
  url: string;
  options?: RequestInit;
  manual?: boolean;
  pollingInterval?: number;
  method?: (url: string, options?: RequestInit) => Promise<T>;
  onSuccess?: (d: T) => void;
  onError?: (e: Error) => void;
}

let globalMethod: (url: string, options?: RequestInit) => Promise<any>;

export const configRequest = (method: () => any) => {
  globalMethod = method;
};

const useAPI = <T = any>(opt: IProps<T>) => {
  const requestMethod = opt.method || globalMethod || fetch;
  return useAsync<T>(
    async () => {
      const res = await requestMethod(opt.url, opt.options);
      return res.json && typeof res.json === 'function' ? res.json() : res;
    },
    [JSON.stringify(opt)],
    {
      manual: opt.manual,
      pollingInterval: opt.pollingInterval,
      onError: opt.onError,
      onSuccess: opt.onSuccess,
    },
  );
};

export default useAPI;
