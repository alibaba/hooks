import { Resource } from './Resource';

export const useResource = <R = any, E = any, P extends any[] = any[]>(
  resource: Resource<R, E, P>,
  ...args: P
) => resource.read(...args);
