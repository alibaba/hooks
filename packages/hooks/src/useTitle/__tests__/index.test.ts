import { renderHook } from '@testing-library/react-hooks';
import useTitle from '../index';

const setUp = (title: string = 'Page Title') => renderHook(() => useTitle(title));

describe('useTitle', () => {
  it('should be defined', () => {
    expect(useTitle).toBeDefined();
  });

  it('test on methods', async () => {
    const { result } = setUp();
    expect(result.current).toBeUndefined();
  });
});
