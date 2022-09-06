import { Resource } from './Resource';
import type { TFetcher } from './type';

export const createResource = <R = any, E = any, P extends any[] = any[]>(
  fetcher: TFetcher<P, R>,
) => new Resource<R, E, P>(fetcher);
