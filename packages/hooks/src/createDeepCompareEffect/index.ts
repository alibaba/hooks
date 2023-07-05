import { useRef } from 'react';
import type { DependencyList, useEffect, useLayoutEffect } from 'react';
import { depsEqual } from '../utils/depsEqual';

type EffectHookType = typeof useEffect | typeof useLayoutEffect;
type CreateUpdateEffect = (hook: EffectHookType) => EffectHookType;

// 高阶函数，接收一个hooks函数，返回一个新函数
export const createDeepCompareEffect: CreateUpdateEffect = (hook) => (effect, deps) => {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<number>(0);
  
  if (deps === undefined || !depsEqual(deps, ref.current)) {
    // 使用ref记录上一次依赖项，如果发生变化更新依赖，+1触发effect函数
    ref.current = deps;
    signalRef.current += 1;
  }
  // 透传effect函数，通过上面判断是否需要更新
  hook(effect, [signalRef.current]);
};
