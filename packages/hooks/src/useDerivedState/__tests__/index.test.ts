import { renderHook } from '@testing-library/react';
import useDerivedState from '../index';

const setUp = (value) => renderHook(() => useDerivedState(value));

it('should support number', () => {
  const { result } = setUp(100);
  const [current] = result.current;
  expect(current).toBe(100);
});

it('should support object', () => {
  const { result } = setUp({});
  const [current] = result.current;
  expect(current).toEqual({});
});
