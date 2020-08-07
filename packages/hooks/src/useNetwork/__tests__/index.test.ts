import { renderHook, act } from '@testing-library/react-hooks';
import useNetwork, { INetworkState } from '../index';

const setUp = (defaultOptional: INetworkState = {}) =>
  renderHook(() => useNetwork(defaultOptional));

describe('useNetwork', () => {
  it('should be defined', () => {
    expect(useNetwork).toBeDefined();
  });

  it('test on default optional', () => {
    const defaultOptional: INetworkState = {
      rtt: 100,
      type: 'wifi',
      since: new Date(),
      online: true,
      downlink: 8.2,
      downlinkMax: 10,
      saveData: true,
      effectiveType: '2g',
    };
    const hook = setUp(defaultOptional);
    expect(hook.result.current).toBe(defaultOptional);
  });
});
