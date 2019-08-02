// import { renderHook, act } from '@testing-library/react-hooks';
import useAPI from '../index';

describe('useAPI', () => {
  it('should be defined', () => {
    expect(useAPI).toBeDefined();
  });

  let hook: any;

  // it('should fetch data', async () => {
  //   act(() => {
  //     hook = renderHook(props => useAPI(props), {
  //       initialProps: {
  //         url:
  //           'https://gw.alipayobjects.com/os/basement_prod/b17023d5-6260-4e4f-bd91-a78802855c2a.json',
  //       },
  //     });
  //   });
  //   expect(hook.result.current.loading).toBe(true);
  //   await hook.waitForNextUpdate();
  //   expect(hook.result.current.data.name).toBe('troy');
  //   expect(hook.result.current.loading).toBe(false);
  //   hook.unmount();
  // });
});
