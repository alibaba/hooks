import { isUndef } from '../../../utils';
import canUseDom from '../../../utils/canUseDom';

export default function isOnline(): boolean {
  if (canUseDom() && !isUndef(navigator.onLine)) {
    return navigator.onLine;
  }
  return true;
}
