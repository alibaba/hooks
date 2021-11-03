import { renderHook } from '@testing-library/react-hooks';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { createUpdateEffect } from '../index';

describe('createUpdateEffect', () => {
  it('should be defined', () => {
    expect(createUpdateEffect).toBeDefined();
  });

  it('should work for useEffect', () => {
    const useUpdateEffect = createUpdateEffect(useEffect);

    let mountedState = 1;
    const hook = renderHook(() =>
      useUpdateEffect(() => {
        mountedState = 2;
      }),
    );
    expect(mountedState).toEqual(1);
    hook.rerender();
    expect(mountedState).toEqual(2);
  });

  it('should work for useLayoutEffect', () => {
    const useUpdateLayoutEffect = createUpdateEffect(useLayoutEffect);

    let mountedState = 1;
    const hook = renderHook(() =>
      useUpdateLayoutEffect(() => {
        mountedState = 2;
      }),
    );
    expect(mountedState).toEqual(1);
    hook.rerender();
    expect(mountedState).toEqual(2);
  });
});
