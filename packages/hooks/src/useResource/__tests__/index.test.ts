import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { createResource, useResource } from '../index';

describe('useResource', () => {
  const resource = createResource(
    (val$1: number, val$2: number) =>
      new Promise<number>((resolve) =>
        setTimeout(() => {
          resolve(val$1 + val$2);
        }, 500),
      ),
  );
  it('test suspense data fetching', async () => {
    const hook = renderHook(() => useResource(resource, 1, 2));
    await waitFor(() => expect(hook.result.current).toEqual(3));
  });
});
