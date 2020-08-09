import { renderHook, act } from '@testing-library/react-hooks';
import useNetwork, { NetworkState } from '../index';

const setUp = (defaultOptional: NetworkState = {}) => renderHook(() => useNetwork(defaultOptional));

describe('useNetwork', () => {
  it('should be defined', () => {
    expect(useNetwork).toBeDefined();
  });

  it('test on default optional', () => {
    const defaultOptional: NetworkState = {
      rtt: 100,
      type: 'wifi',
      since: new Date(),
      online: true,
      downlink: 8.2,
      downlinkMax: 10,
      saveData: true,
      effectiveType: '2g',
    };
    const nav = (typeof navigator !== 'object' ? null : navigator) as any;
    const connection = (nav && (nav.connection || nav.mozConnection || nav.webkitConnection)) || {};
    const hook = setUp(defaultOptional);
    const result = { ...defaultOptional, ...connection };
    expect(hook.result.current.rtt).toBe(result.rtt);
    expect(hook.result.current.type).toBe(result.type);
    expect(hook.result.current.since).toBe(result.since);
    expect(hook.result.current.online).toBe(result.online);
    expect(hook.result.current.downlink).toBe(result.downlink);
    expect(hook.result.current.downlinkMax).toBe(result.downlinkMax);
    expect(hook.result.current.saveData).toBe(result.saveData);
    expect(hook.result.current.effectiveType).toBe(result.effectiveType);
  });
});
