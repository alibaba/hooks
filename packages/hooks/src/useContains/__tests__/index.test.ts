import { renderHook } from '@testing-library/react';
import useContains from '../index';

describe('useContains', () => {
  let div: HTMLElement;

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it('test on mousedown callback', async () => {
    let value: string = 'default';
    const callback = (isWithin) => {
      value = isWithin ? 'within' : 'without';
    };
    const { rerender, unmount } = renderHook(() => useContains(div, callback));

    expect(value).toEqual('default');
    rerender();
    document.dispatchEvent(new Event('mousedown'));
    expect(value).toEqual('without');
    unmount();
    div.dispatchEvent(new Event('mousedown'));
    expect(value).toEqual('within');
  });
});
