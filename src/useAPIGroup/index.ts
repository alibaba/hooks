import { useRef } from 'react';
import { BaseOptions, BasePaginatedOptions, BaseResult, OptionsWithFormat, PaginatedFormatReturn, PaginatedOptionsWithFormat, PaginatedParams, PaginatedResult } from './types';
import useAsync from './useAsync';
import usePaginated from './usePaginated';

function useAPI<R, P extends any[], U, UU extends U = any>(
  service: (...args: P) => Promise<R>,
  options: OptionsWithFormat<R, P, U, UU>
): BaseResult<U, P>
function useAPI<R, P extends any[]>(
  service: (...args: P) => Promise<R>,
  options?: BaseOptions<R, P>
): BaseResult<R, P>
function useAPI<R, Item, U extends Item = any>(
  service: (params: PaginatedParams<U>) => Promise<R>,
  options: PaginatedOptionsWithFormat<R, Item, U>
): PaginatedResult<Item>
function useAPI<R, Item, U extends Item = any>(
  service: (params: PaginatedParams<U>) => Promise<PaginatedFormatReturn<Item>>,
  options: BasePaginatedOptions<U>
): PaginatedResult<Item>
function useAPI(service: any, options: any = {}) {

  const { paginated } = options;

  const paginatedRef = useRef(paginated);
  if (paginatedRef.current !== paginated) {
    throw Error('You should not modify this paginated of options');
  }
  paginatedRef.current = paginated;

  if (paginated) {
    return usePaginated(service, options);
  } else {
    return useAsync(service, options);
  }
}

export default useAPI;
