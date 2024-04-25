import { Bus } from '../index';

describe('Bus', () => {
  it('should work for useEffect', () => {
    let mountedState = 1;
    //订阅
    Bus.$on('updateMountedState', (args) => {
      mountedState = args;
    });
    //发布
    Bus.$emit('updateMountedState', 2);
    expect(mountedState).toBe(2);
  });
});
