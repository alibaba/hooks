import { usePostMessage } from 'ahooks';

describe('usePostMessage', () => {
  test('usePostMessage should be defined', () => {
    require('../demo/demo1');
    expect(usePostMessage).toBeDefined();
  });
});
