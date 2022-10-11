// write your test cases here
import { renderHook, act } from '@testing-library/react-hooks';
import useHash from '../index';

describe('useHash', () => {
  it('should hash change', () => {
    const hash = '#/newhash';
    const setHash = '#/sethash';
    const { result } = renderHook(() => useHash());

    expect(result.current[0]).toBe('');

    act(() => {
      window.location.hash = hash;
    });

    expect(result.current[0]).toBe(hash);

    act(() => {
      result.current[1](setHash);
    });

    expect(result.current[0]).toBe(setHash);
  });
});
