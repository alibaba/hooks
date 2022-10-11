// write your test cases here
import { renderHook, act } from '@testing-library/react-hooks';
import useHash from '../index';

describe('useHash', () => {
  it('should hash change', async () => {
    const hash = '#/newhash';
    const setHash = '#/sethash';
    let trigger = 0;
    let hashHistory = '';
    let prevHashHistory = '';
    const { result, waitForNextUpdate } = renderHook(() =>
      useHash({
        onChange: (currentHash, prevHash) => {
          trigger++;
          hashHistory = currentHash;
          prevHashHistory = prevHash;
        },
      }),
    );

    expect(result.current[0]).toBe('');

    act(() => {
      window.location.hash = hash;
    });

    await waitForNextUpdate();

    expect(result.current[0]).toBe(hash);

    expect(trigger).toBe(1);
    expect(hashHistory).toBe(hash);
    expect(prevHashHistory).toBe('');

    act(() => {
      result.current[1](setHash);
    });

    await waitForNextUpdate();

    expect(result.current[0]).toBe(setHash);

    expect(trigger).toBe(2);
    expect(hashHistory).toBe(setHash);
    expect(prevHashHistory).toBe(hash);
  });
});
