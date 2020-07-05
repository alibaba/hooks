import request, { RequestOptionsInit } from 'umi-request';
import { BaseOptions, BaseResult, OptionsWithFormat } from './types';
import useAsync from './useAsync';

export type RequestService = string | ({ url: string } & RequestOptionsInit);
export type Service<P extends any[]> = RequestService | ((...args: P) => RequestService);

function useRequest<R, P extends any[], U, UU extends U = any>(
  service: Service<P>,
  options: OptionsWithFormat<R, P, U, UU>,
): BaseResult<U, P>;
function useRequest<R, P extends any[]>(
  service: Service<P>,
  options?: BaseOptions<R, P>,
): BaseResult<R, P>;
function useRequest(service: any, options?: any): any {
  let promiseService: () => Promise<any>;
  if (typeof service === 'string') {
    promiseService = () => request(service);
  } else if (typeof service === 'object') {
    const { url, ...rest } = service;
    promiseService = () => request(url, rest);
  } else {
    promiseService = (...args) =>
      new Promise((resolve) => {
        const result = service(...args);
        if (typeof result === 'string') {
          request(result).then((data) => {
            resolve(data);
          });
        } else if (typeof result === 'object') {
          const { url, ...rest } = result;
          request(url, rest).then((data) => {
            resolve(data);
          });
        }
      });
  }
  return useAsync(promiseService, options);
}

export default useRequest;
