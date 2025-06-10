import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';

declare type TargetValue<T> = T | undefined | null;

const checkIfAllInShadow = (targets: BasicTarget[]) => {
  return targets.every((item) => {
    const targetElement = getTargetElement(item);
    if (!targetElement) {
      return false;
    }
    if (targetElement.getRootNode() instanceof ShadowRoot) {
      return true;
    }
    return false;
  });
};

const getShadow = (node: TargetValue<Element>) => {
  if (!node) {
    return document;
  }
  return node.getRootNode();
};

const getDocumentOrShadow = (target: BasicTarget | BasicTarget[]): Document | Node => {
  if (!target || !document.getRootNode) {
    return document;
  }

  const targets = Array.isArray(target) ? target : [target];

  if (checkIfAllInShadow(targets)) {
    return getShadow(getTargetElement(targets[0]));
  }

  return document;
};

export default getDocumentOrShadow;
