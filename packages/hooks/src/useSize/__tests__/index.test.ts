import { renderHook } from '@testing-library/react-hooks';
import useSize from '../index';

// test about Resize Observer see https://github.com/que-etc/resize-observer-polyfill/tree/master/tests
describe('useSize', () => {
  it('should be defined', () => {
    expect(useSize).toBeDefined();
  });
});
