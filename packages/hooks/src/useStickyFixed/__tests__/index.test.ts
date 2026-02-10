import { act, renderHook } from '@testing-library/react';
import useStickyFixed from '../index';

const scrollElement = document.createElement('div');
scrollElement.style.overflowY = 'scroll';
scrollElement.style.height = '200px'; // 设置高度以允许滚动
scrollElement.style.width = '200px'; // 设置高度以允许滚动
document.body.appendChild(scrollElement);

const topElement = document.createElement('div'); //top元素用于填充
topElement.style.height = '100px';
scrollElement.appendChild(topElement);

const targetElement = document.createElement('div'); // 模拟 sticky 的元素
targetElement.style.position = 'sticky';
targetElement.style.top = '0';
targetElement.style.height = '20px'; //其他元素用于填充
scrollElement.appendChild(targetElement);

const bottomElement = document.createElement('div'); //bottom元素用于填充
bottomElement.style.height = '200px';
scrollElement.appendChild(bottomElement);

describe('useStickyFixed', () => {
  it('should set state to false when not scrolling', () => {
    const { result } = renderHook(() => useStickyFixed(targetElement, { scrollTarget: scrollElement }));

    // 开始未滚动 返回false
    expect(result.current[0]).toBe(false);
  });

  it('should not throw if target is not found', () => {
    const { result } = renderHook(() => useStickyFixed(null, { scrollTarget: scrollElement }));

    act(() => {
      scrollElement.scrollTop = 0;
      scrollElement.dispatchEvent(new Event('scroll'));
    });

    expect(result.current[0]).toBe(false); // 没有抛出错误
  });
});
