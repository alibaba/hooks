import React, { useRef, useEffect, useState, useMemo } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export interface OptionType {
  itemHeight?: number | ((index: number) => number);
  buffer?: number;
}

export default <T = any>(list: T[], options?: OptionType) => {
  const containerRef = useRef<HTMLElement>();
  const [state, setState] = useState({ start: 0, end: 10 });
  const { itemHeight = 30, buffer = 5 } = options || {};

  const getViewCapacity = (containerHeight: number) => {
    if (typeof itemHeight === 'number') {
      return Math.ceil(containerHeight / itemHeight);
    }
    const { start = 0 } = state;
    let sum = 0;
    let capacity = 0;
    for (let i = start; i < list.length; i++) {
      const height = (itemHeight as ((index: number) => number))(i);
      sum += height;
      if (sum >= containerHeight) {
        capacity = i;
        break;
      }
    }
    return capacity - start;
  };

  const getOffset = (scrollTop: number) => {
    if (typeof itemHeight === 'number') {
      return Math.floor(scrollTop / itemHeight) + 1;
    }
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < list.length; i++) {
      const height = (itemHeight as ((index: number) => number))(i);
      sum += height;
      if (sum >= scrollTop) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };

  const calculateRange = () => {
    const element = containerRef.current;
    if (element) {
      const offset = getOffset(element.scrollTop);
      const viewCapacity = getViewCapacity(element.clientHeight);

      const from = offset - buffer;
      const to = offset + viewCapacity + buffer;
      setState({ start: from < 0 ? 0 : from, end: to > list.length ? list.length : to });
    }
  };

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      calculateRange();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const totalHeight = useMemo(() => {
    if (typeof itemHeight === 'number') {
      return list.length * itemHeight;
    }
    return list.reduce((sum, _, index) => sum + itemHeight(index), 0);
  }, [list.length]);

  const getDistenceTop = (index: number) => {
    if (typeof itemHeight === 'number') {
      return index * itemHeight;
    }
    return list.slice(0, index).reduce((sum, _, i) => sum + itemHeight(i), 0);
  };

  const wrapperStyle = () => ({
    height: totalHeight,
    paddingTop: getDistenceTop(state.start),
  });

  const scrollTo = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = getDistenceTop(index);
      calculateRange();
    }
  };

  return {
    list: list.slice(state.start, state.end).map((ele, index) => ({
      data: ele,
      index: index + state.start,
    })),
    scrollTo,
    containerProps: () => ({
      ref: (ref: HTMLElement) => {
        containerRef.current = ref;
      },
      onScroll: (e: any) => {
        e.preventDefault();
        calculateRange();
      },
      style: { overflowY: 'auto' },
    }),
    wrapperProps: () => ({
      style: { width: '100%', ...wrapperStyle() },
    }),
  };
};
