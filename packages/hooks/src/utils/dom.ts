import { MutableRefObject } from 'react';

type TargetElement = HTMLElement | Document | Window;
type TargetParams = (() => HTMLElement) | MutableRefObject<HTMLElement> | TargetElement;

export function getTarget(target?: TargetParams, defaultDom?: TargetElement): TargetElement | undefined {
  if (!target) {
    return defaultDom;
  }

  let targetElement: TargetElement;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}
