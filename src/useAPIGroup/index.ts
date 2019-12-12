import { BaseOptions, BasePaginatedOptions, PaginatedFormatReturn, BaseResult, OptionsWithFormat, PaginatedOptionsWithFormat, PaginatedParams, PaginatedResult } from './types';
import useAsync from './useAsync';
import usePaginated from './usePaginated';


function useAPI<R, P extends any[], U, UU extends U = any>(
  service: (...args: P) => Promise<R>,
  options?: OptionsWithFormat<R, P, U, UU>
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

  const result = useAsync(service, {
    ...options,
    manual: paginated || options.manual,
  });

  const paginatedResult = usePaginated(service, {
    ...options,
    manual: !paginated || options.manual,
  });

  return paginated ? paginatedResult : result;
}

export default useAPI;
