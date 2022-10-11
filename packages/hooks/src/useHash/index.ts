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

export type Options = {
  onChange?: (hash: string, prevHash: string) => void;
};

export default (options?: Options): [string, (newHash: string) => void] => {
  const { onChange } = options || {};
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
    const currentHash = getHash();
    const newHash = _getHash();
    setHash(newHash);
    onChange?.(newHash, currentHash);
  });

  return [hash, changeHash];
};
