import { useState } from 'react';
import { Resource } from './Resource';

export const useResource = <R = any, E = any, P extends any[] = any[]>(
  resource: Resource<R, E, P>,
  ...args: P
) =>
  // ? 是否可以利用useState惰性初始化函数仅执行一次的特性来实现数据在组件重新挂载时更新
  useState(() => resource.read(...args))[0];
