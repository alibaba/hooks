import { useEffect, useMemo, useState, useRef } from 'react';
import useEventListener from '../useEventListener';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import useSize from '../useSize';
import { getTargetElement } from '../utils/domTarget';
import type { BasicTarget } from '../utils/domTarget';

export interface Options<T> {
  containerTarget: BasicTarget;
  wrapperTarget: BasicTarget;
  itemHeight: number | ((index: number, data: T) => number);
  overscan?: number;
}

const DEFAULT_OVERSCAN = 5;

const useVirtualList = <T = any>(list: T[], options: Options<T>) => {
  const { containerTarget, wrapperTarget, itemHeight, overscan = DEFAULT_OVERSCAN } = options;

  const itemHeightRef = useLatest(itemHeight);
  const floorOverscan = Math.floor(overscan);
  const formatOverscan = isNaN(floorOverscan)
    ? DEFAULT_OVERSCAN
    : floorOverscan >= 0
    ? floorOverscan
    : 0;

  const size = useSize(containerTarget);

  const scrollTriggerByScrollToFunc = useRef(false);

  const [targetList, setTargetList] = useState<{ index: number; data: T }[]>([]);

  const getVisibleCount = (containerHeight: number, fromIndex: number) => {
    if (typeof itemHeightRef.current === 'number') {
      return Math.ceil(containerHeight / itemHeightRef.current);
    }

    let sum = 0;
    let endIndex = 0;
    for (let i = fromIndex; i < list.length; i++) {
      const height = itemHeightRef.current(i, list[i]);
      sum += height;
      endIndex = i;
      if (sum >= containerHeight) {
        break;
      }
    }
    return endIndex - fromIndex + 1;
  };

  const getOffset = (scrollTop: number) => {
    if (scrollTop === 0) return 0;

    if (typeof itemHeightRef.current === 'number') {
      return Math.floor(scrollTop / itemHeightRef.current);
    }

    let sum = 0;
    let offset = 0;
    for (let i = 0; i < list.length; i++) {
      const height = itemHeightRef.current(i, list[i]);
      sum += height;
      if (sum === scrollTop) {
        offset = i + 1;
        break;
      } else if (sum > scrollTop) {
        offset = i;
        break;
      }
    }

    return offset;
  };

  // 获取上部高度
  const getDistanceTop = (index: number) => {
    if (typeof itemHeightRef.current === 'number') {
      const height = index * itemHeightRef.current;
      return height;
    }
    const height = list
      .slice(0, index)
      // @ts-ignore
      .reduce((sum, _, i) => sum + itemHeightRef.current(i, list[i]), 0);
    return height;
  };

  // 获取可视区域第一个节点滚动的距离
  const getVisibleAreaFirstItemScrollDistance = (scrollTop: number, start: number) => {
    if (start === 0) return scrollTop;

    if (typeof itemHeightRef.current === 'number') {
      return scrollTop % itemHeightRef.current;
    }
    const height = list
      .slice(start, start + formatOverscan)
      // @ts-ignore
      .reduce((sum, _, i) => sum + itemHeightRef.current(start + i, list[start + i]), 0);

    return scrollTop - height;
  };

  const totalHeight = useMemo(() => {
    if (typeof itemHeightRef.current === 'number') {
      return list.length * itemHeightRef.current;
    }
    // @ts-ignore
    return list.reduce((sum, _, index) => sum + itemHeightRef.current(index, list[index]), 0);
  }, [list]);

  const calculateRange = () => {
    const container = getTargetElement(containerTarget);
    const wrapper = getTargetElement(wrapperTarget);

    if (container && wrapper) {
      const { scrollTop, clientHeight } = container;

      const offset = getOffset(scrollTop);
      const start = Math.max(0, offset - formatOverscan);
      const offsetTop = getDistanceTop(start);
      const visibleAreaFirstItemScrollDistance = getVisibleAreaFirstItemScrollDistance(
        scrollTop - offsetTop,
        start,
      );

      const visibleCount = getVisibleCount(
        clientHeight + visibleAreaFirstItemScrollDistance,
        offset,
      );
      const end = Math.min(list.length, offset + visibleCount + formatOverscan);

      // @ts-ignore
      wrapper.style.height = totalHeight - offsetTop + 'px';
      // @ts-ignore
      wrapper.style.marginTop = offsetTop + 'px';

      setTargetList(
        list.slice(start, end).map((ele, index) => ({
          data: ele,
          index: index + start,
        })),
      );
    }
  };

  useEffect(() => {
    if (!size?.width || !size?.height) {
      return;
    }
    calculateRange();
  }, [size?.width, size?.height, list]);

  useEventListener(
    'scroll',
    (e) => {
      if (scrollTriggerByScrollToFunc.current) {
        scrollTriggerByScrollToFunc.current = false;
        return;
      }
      e.preventDefault();
      calculateRange();
    },
    {
      target: containerTarget,
    },
  );

  const scrollTo = (index: number) => {
    const container = getTargetElement(containerTarget);
    if (container) {
      scrollTriggerByScrollToFunc.current = true;
      container.scrollTop = getDistanceTop(index);
      calculateRange();
    }
  };

  return [targetList, useMemoizedFn(scrollTo)] as const;
};

export default useVirtualList;
