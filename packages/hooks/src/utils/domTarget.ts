import type { MutableRefObject } from 'react';
import { isFunction, isReactRef } from './index';
import isBrowser from './isBrowser';

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;

export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
  if (!isBrowser) {
    return undefined;
  }

  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetValue<T>;

  if (isFunction(target)) {
    targetElement = target();
  } else if (isReactRef(target)) {
    // @ts-ignore
    targetElement = target.current;
  } else {
    // @ts-ignore
    targetElement = target;
  }

  return targetElement;
}
