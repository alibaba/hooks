import type { DependencyList } from 'react';
import isEqual from 'react-fast-compare';

export const depsEqual = (aDeps: DependencyList = [], bDeps: DependencyList = []) =>
  isEqual(aDeps, bDeps);
