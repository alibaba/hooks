import { useState } from 'react';
import { Resource } from './Resource';

export const useResource = <R = any, E = any, P extends any[] = any[]>(
  resource: Resource<R, E, P>,
  ...args: P
) => useState(() => resource.read(...args))[0];
