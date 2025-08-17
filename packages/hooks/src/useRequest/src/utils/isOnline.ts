import isBrowser from '../../../utils/isBrowser';

const isOnline = () => {
  if (isBrowser && typeof navigator.onLine !== 'undefined') {
    return navigator.onLine;
  }
  return true;
};

export default isOnline;
