import request from 'umi-request';
import useAsync from '../useAsync';

interface IProps<T> {
  url: string;
  options?: RequestInit;
  manual?: boolean;
  pollingInterval?: number;
  fetch?: (url: string, options?: RequestInit) => Promise<T>;
}

const requestMethod = fetch || request;

const useAPI = <T = any>(opt: IProps<T>) =>
  useAsync<T>(
    async () =>
      new Promise<T>((resolve, reject) => {
        requestMethod(opt.url, opt.options)
          .then(async res => {
            resolve(await res.json());
          })
          .catch(e => {
            reject(e);
          });
      }),
    [JSON.stringify(opt)],
    {
      manual: opt.manual,
      pollingInterval: opt.pollingInterval,
    },
  );

export default useAPI;
