export type UseSwipeDirection = 'up' | 'down' | 'left' | 'right' | null;

export interface UseSwipeOptions {
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
  onSwipe?: (e: TouchEvent, direction: UseSwipeDirection) => void;

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
