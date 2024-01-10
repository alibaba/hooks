import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks';
import useTarnsfer, { ReturnValue } from '../index';

describe('useTarnsfer', () => {
  let hook: RenderHookResult<any, ReturnValue<any>>;
  const mockData = [];
  for (let i = 0; i < 20; i++) {
    mockData.push({
      key: i.toString(),
      value: `content${i}`,
      description: `description of content${i}`,
      disabled: i % 3 < 1,
    });
  }

  const setUp = () => renderHook(() => useTarnsfer(mockData));

  beforeEach(() => {
    hook = setUp();
  });

  it('selectAll and unSelectAll should work correct', async () => {
    expect(hook.result.current.transferProps.selectedKeys.length).toBe(0);
    expect(hook.result.current.unSelectedKeys.length).toBe(mockData.length);
    act(() => {
      hook.result.current.selectAll();
    });
    expect(hook.result.current.transferProps.selectedKeys.length).toBe(mockData.length);
    expect(hook.result.current.unSelectedKeys.length).toBe(0);
    act(() => {
      hook.result.current.unSelectAll();
    });
    expect(hook.result.current.transferProps.selectedKeys.length).toBe(0);
    expect(hook.result.current.unSelectedKeys.length).toBe(mockData.length);
  });

  it('leftAll and rightAll should work correct', async () => {
    expect(hook.result.current.transferProps.targetKeys.length).toBe(0);
    expect(hook.result.current.noTargetKeys.length).toBe(mockData.length);
    act(() => {
      hook.result.current.rightAll();
    });
    expect(hook.result.current.transferProps.targetKeys.length).toBe(mockData.length);
    expect(hook.result.current.noTargetKeys.length).toBe(0);
    act(() => {
      hook.result.current.leftAll();
    });
    expect(hook.result.current.transferProps.targetKeys.length).toBe(0);
    expect(hook.result.current.noTargetKeys.length).toBe(mockData.length);
  });
});
