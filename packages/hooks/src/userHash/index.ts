import { useCallback } from 'react';
import useEventListener from '../useEventListener';
import useGetState from '../useGetState';

function _getHash() {
  try {
    return window.location.hash;
  } catch (err) {
    return '';
  }
}

export default (): [string, (newHash: string) => void] => {
  const [hash, setHash, getHash] = useGetState<string>(_getHash);

  const changeHash = useCallback((newHash: string) => {
    const currentHash = getHash();
    if (currentHash !== newHash) {
      try {
        window.location.hash = newHash;
      } catch (err) {}
    }
  }, []);

  useEventListener('hashchange', () => {
    setHash(_getHash());
  });

  return [hash, changeHash];
};
