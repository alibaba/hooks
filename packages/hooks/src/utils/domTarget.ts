import type { MutableRefObject } from 'react';
import isBrowser from './isBrowser';

type Target<T> = T | undefined | null;

export type BasicTarget<T = Element> = (() => Target<T>) | Target<T> | MutableRefObject<Target<T>>;

export function getTargetElement<T>(target: BasicTarget<T>, defaultElement?: T) {
  if (!isBrowser) {
    return undefined;
  }

  if (!target) {
    return defaultElement;
  }

  let targetElement: Target<T>;

  if (typeof target === 'function') {
    // @ts-ignore
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}
