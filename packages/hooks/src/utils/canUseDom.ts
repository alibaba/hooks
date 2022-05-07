import { isUndef } from './index';

export default function canUseDom() {
  return !!(!isUndef(window) && window.document && window.document.createElement);
}
