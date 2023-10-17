export type UseSwipeDirection = 'up' | 'down' | 'left' | 'right' | null;

export interface UseSwipeOptions {
  /**
   * 检测滑动的方向
   * 如果不传direction的话就是默认用户自己实现swipe的direction
   * 如果传了direction我们hook内部就自动帮用户检测
   */
  direction?: UseSwipeDirection;

  /**
   * Register events as passive
   *
   * @default true
   */
  passive?: boolean;

  /**
   * 检测的阈值
   * @default 50
   */
  threshold?: number;

  /**
   * 滑动开始时调用
   */
  onSwipeStart?: (e: TouchEvent) => void;

  /**
   * 滑动时调用
   */
  onSwipe?: (e: TouchEvent) => void;

  /**
   * 滑动结束后调用
   */
  onSwipeEnd?: (e: TouchEvent, direction: UseSwipeDirection) => void;
}

export interface UseSwipeReturn {
  /**
   * 是否在滑动
   */
  isSwiping: boolean;

  /**
   * 滑动的 x 轴距离
   */
  lengthX: number;

  /**
   * 滑动的 y 轴距离
   */
  lengthY: number;

  /**
   * 滑动的方向
   */
  direction: UseSwipeDirection;
}
