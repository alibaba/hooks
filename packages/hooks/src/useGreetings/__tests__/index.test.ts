import { renderHook } from '@testing-library/react';
import useGreetings from '../index';

const setUp = () => renderHook(() => useGreetings());

describe('useGreetings', () => {
  it('test', () => {
    const hook1 = setUp();
    expect(hook1.result.current).toMatch(/^morning|afternoon|evening|night$/);
  });
});
