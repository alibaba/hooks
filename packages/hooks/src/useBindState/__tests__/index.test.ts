import { renderHook, act } from '@testing-library/react-hooks';
import useBindState from '../index';

describe('useBindState', () => {
  it('should render the', function () {
    const state = { user: { name: '', address: { name: '' } } };
    const hooks = renderHook(() => {
      return useBindState(state);
    });
    expect(hooks.result.current.state.user.name).toEqual('');
    act(() => {
      hooks.result.current.unSafeSetState('user.name', 'xx');
    });
    hooks.result.current.options('user.name');
    expect(hooks.result.current.state.user.name).toEqual('xx');
  });
});
