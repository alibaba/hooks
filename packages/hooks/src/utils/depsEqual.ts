import type { DependencyList } from 'react';
import { isEqual } from 'lodash-es';

export const depsEqual = (aDeps: DependencyList = [], bDeps: DependencyList = []) =>
  isEqual(aDeps, bDeps);
