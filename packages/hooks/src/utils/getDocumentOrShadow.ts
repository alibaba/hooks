import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';

const getRootNode = (node: Element) => {
  return node.getRootNode ? node.getRootNode() : document;
};

const getDocumentOrShadow = (target: BasicTarget): Document | Node => {
  if (!target) {
    return document;
  }

  const targetElement = getTargetElement(target);

  if (!targetElement) {
    return document;
  }

  const rootNode = getRootNode(targetElement);

  if (rootNode instanceof ShadowRoot) {
    return rootNode.mode === 'open' ? document : rootNode;
  }

  return rootNode;
};

export default getDocumentOrShadow;
