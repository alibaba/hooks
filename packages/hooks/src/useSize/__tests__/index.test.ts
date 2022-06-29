import { renderHook } from '@testing-library/react-hooks';
import useSize from '../index';

// test about Resize Observer see https://github.com/que-etc/resize-observer-polyfill/tree/master/tests
describe('useSize', () => {
  it('with argument', () => {
    const hook = renderHook(() => useSize(document.body));
    expect(hook.result.current).toEqual(undefined);
  });
});
