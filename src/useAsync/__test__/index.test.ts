import { renderHook, act } from '@testing-library/react-hooks';
import fetch from 'umi-request';
import useAsync from '../index';

describe('useAPI', () => {
  it('should be defined', () => {
    expect(useAsync).toBeDefined();
  });

  describe('run', () => {
    let hook: any;
    const getResult = async (something: string) =>
      fetch(
        'https://gw.alipayobjects.com/os/basement_prod/b17023d5-6260-4e4f-bd91-a78802855c2a.json',
      );

    beforeEach(() => {
      // NOTE: renderHook isn't good at inferring array types
      hook = renderHook(({ func }) => useAsync(func), {
        initialProps: {
          func: getResult,
        },
      });
    });

    it('awaits the result', async () => {
      const { run, loading } = hook.result.current;
      expect(loading).toEqual(true);
      act(() => {
        run();
      });
      await hook.waitForNextUpdate();
      expect(hook.result.current.data.data.name).toEqual('troy');
      expect(hook.result.current.loading).toEqual(false);
    });
  });
});
