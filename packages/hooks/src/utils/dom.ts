/**
 * Thx rc-util
 * copied from https://github.com/react-component/util/blob/v5.44.3/src/Dom/findDOMNode.ts#L4-L23
 */

export function isDOM(node: any): node is HTMLElement | SVGElement {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element
  // Since XULElement is also subclass of Element, we only need HTMLElement and SVGElement
  return node instanceof HTMLElement || node instanceof SVGElement;
}

/**
 * Retrieves a DOM node via a ref, and does not invoke `findDOMNode`.
 */
export function getDOM(node: any): HTMLElement | SVGElement | null {
  if (node && typeof node === 'object' && isDOM(node.nativeElement)) {
    return node.nativeElement;
  }

  if (isDOM(node)) {
    return node as any;
  }

  return null;
}
