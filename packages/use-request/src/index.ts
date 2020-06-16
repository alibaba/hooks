import { useRef, useContext } from 'react';
import request from 'umi-request';
import { BaseOptions, BasePaginatedOptions, BaseResult, CombineService, LoadMoreFormatReturn, LoadMoreOptions, LoadMoreOptionsWithFormat, LoadMoreParams, LoadMoreResult, OptionsWithFormat, PaginatedFormatReturn, PaginatedOptionsWithFormat, PaginatedParams, PaginatedResult } from './types';
import useAsync from './useAsync';
import useLoadMore from './useLoadMore';
import usePaginated from './usePaginated';
import ConfigContext from './configContext';

function useRequest<R = any, P extends any[] = any, U = any, UU extends U = any>(
  service: CombineService<R, P>,
  options: OptionsWithFormat<R, P, U, UU>
): BaseResult<U, P>
function useRequest<R = any, P extends any[] = any>(
  service: CombineService<R, P>,
  options?: BaseOptions<R, P>
): BaseResult<R, P>

function useRequest<R extends LoadMoreFormatReturn, RR>(
  service: CombineService<RR, LoadMoreParams<R>>,
  options: LoadMoreOptionsWithFormat<R, RR>
): LoadMoreResult<R>
function useRequest<R extends LoadMoreFormatReturn, RR extends R>(
  service: CombineService<R, LoadMoreParams<R>>,
  options: LoadMoreOptions<RR>
): LoadMoreResult<R>

function useRequest<R = any, Item = any, U extends Item = any>(
  service: CombineService<R, PaginatedParams>,
  options: PaginatedOptionsWithFormat<R, Item, U>
): PaginatedResult<Item>
function useRequest<R = any, Item = any, U extends Item = any>(
  service: CombineService<PaginatedFormatReturn<Item>, PaginatedParams>,
  options: BasePaginatedOptions<U>
): PaginatedResult<Item>

function useRequest(service: any, options: any = {}) {
  const contextConfig = useContext(ConfigContext);
  const finalOptions = { ...contextConfig, ...options };

  const { paginated, loadMore, requestMethod } = finalOptions;

  const paginatedRef = useRef(paginated);
  const loadMoreRef = useRef(loadMore);

  if (paginatedRef.current !== paginated) {
    throw Error('You should not modify the paginated of options');
  }

  if (loadMoreRef.current !== loadMore) {
    throw Error('You should not modify the loadMore of options');
  }

  paginatedRef.current = paginated;
  loadMoreRef.current = loadMore;

  const finalRequestMethod = requestMethod || request;

  let promiseService: () => Promise<any>;
  if (typeof service === 'string') {
    promiseService = () => finalRequestMethod(service);
  } else if (typeof service === 'object') {
    const { url, ...rest } = service;
    promiseService = () => (requestMethod ? requestMethod(service) : request(url, rest));
  } else {
    promiseService = (...args: any[]) => new Promise((resolve, reject) => {
      const result = service(...args);
      if (result.then) {
        result.then((data: any) => resolve(data)).catch((e: any) => reject(e))
      } else if (typeof result === 'string') {
        finalRequestMethod(result).then((data: any) => { resolve(data) }).catch((e: any) => reject(e));
      } else if (typeof result === 'object') {
        // umi-request 需要拆分下字段
        if (requestMethod) {
          finalRequestMethod(result).then((data: any) => { resolve(data) }).catch((e: any) => reject(e));
        } else {
          const { url, ...rest } = result;
          request(url, rest).then((data: any) => { resolve(data) }).catch((e: any) => reject(e));
        }
      }
    });
  }

  if (loadMore) {
    return useLoadMore(promiseService, finalOptions);
  } if (paginated) {
    return usePaginated(promiseService, finalOptions);
  }
  return useAsync(promiseService, finalOptions);
}

const UseAPIProvider = ConfigContext.Provider;

export {
  useAsync,
  usePaginated,
  useLoadMore,
  UseAPIProvider
};

export default useRequest;
