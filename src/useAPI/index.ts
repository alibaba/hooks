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

export const setFetch = (method: () => any) => {
  globalMethod = method;
};

const useAPI = <T = any>(opt: IProps<T>) => {
  const requestMethod = opt.method || globalMethod || window.fetch;
  return useAsync<T>(
    async () =>
      new Promise<T>((resolve, reject) => {
        requestMethod(opt.url, opt.options)
          .then(async res => {
            resolve(res.json && typeof res.json === 'function' ? res.json() : res);
          })
          .catch(e => {
            reject(e);
          });
      }),
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
