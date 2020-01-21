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
function useRequest<R = any, Item = any, U extends Item = any>(
  service: CombineService<R, LoadMoreParams>,
  options: LoadMoreOptionsWithFormat<R, Item, U>
): LoadMoreResult<Item>
function useRequest<R = any, Item = any, U extends Item = any>(
  service: CombineService<LoadMoreFormatReturn<Item>, LoadMoreParams>,
  options: LoadMoreOptions<U>
): LoadMoreResult<Item>

function useRequest<R = any, Item = any, U extends Item = any>(
  service: CombineService<R, PaginatedParams<U>>,
  options: PaginatedOptionsWithFormat<R, Item, U>
): PaginatedResult<Item>
function useRequest<R = any, Item = any, U extends Item = any>(
  service: CombineService<PaginatedFormatReturn<Item>, PaginatedParams<U>>,
  options: BasePaginatedOptions<U>
): PaginatedResult<Item>

function useRequest(service: any, options: any = {}) {

  const contextConfig = useContext(ConfigContext);
  const finalOptions = { ...contextConfig, ...options };

  const { paginated, loadMore, requestMehod } = finalOptions;

  const paginatedRef = useRef(paginated);
  const loadMoreRef = useRef(loadMore);

  if (paginatedRef.current !== paginated) {
    throw Error('You should not modify this paginated of options');
  }

  if (loadMoreRef.current !== loadMore) {
    throw Error('You should not modify this loadMore of options');
  }

  paginatedRef.current = paginated;
  loadMoreRef.current = loadMore;

  const finalRequestMehod = requestMehod || request;

  let promiseService: () => Promise<any>;
  if (typeof service === 'string') {
    promiseService = () => finalRequestMehod(service);
  } else if (typeof service === 'object') {
    const { url, ...rest } = service;
    promiseService = () => finalRequestMehod(url, rest);
  } else {
    promiseService = (...args: any[]) => {
      return new Promise((resolve) => {
        const result = service(...args);
        if (result.then) {
          result.then((data: any) => resolve(data))
        } else if (typeof result === 'string') {
          finalRequestMehod(result).then((data: any) => { resolve(data) });
        } else if (typeof result === 'object') {
          // umi-request 需要拆分下字段
          if (requestMehod) {
            finalRequestMehod(result).then((data: any) => { resolve(data) });
          } else {
            const { url, ...rest } = result;
            request(url, rest).then((data: any) => { resolve(data) });
          }
        }
      })
    };
  }

  if (loadMore) {
    return useLoadMore(promiseService, finalOptions);
  } else if (paginated) {
    return usePaginated(promiseService, finalOptions);
  } else {
    return useAsync(promiseService, finalOptions);
  }
}

const UseAPIProvider = ConfigContext.Provider;

export {
  useAsync,
  usePaginated,
  useLoadMore,
  UseAPIProvider
};

export default useRequest;
