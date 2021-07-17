import { MutableRefObject, useEffect, useState } from 'react';

/**
 * 根据当前移动距离判断是上移还是下移多少基础高度
 * Judge whether to move up or down according to the current moving distance
 * @param y 移动的距离 deviation
 */
function getFormatDeviation(y: number, base: number): number {
  if (y === 0) {
    return 0;
  }
  // 在选项之间
  // between data item
  let result = 0;
  const multiple = Math.round(y / base);
  const deviation = multiple * base;
  result = deviation;
  return result;
}

export declare interface IUseTouchScrollParam<E extends HTMLElement> {
  ref: MutableRefObject<E>;
  // 位移基数，每次moving结束都会根据基数取向最接近倍数基数值
  // move deviation base,
  // At the end of each moving, the nearest multiple base value will be oriented according to the cardinality
  deviationXBase?: number;
  deviationYBase?: number;
}

export declare interface IPosition {
  x: number;
  y: number;
}

export declare interface IDeviation {
  x: number;
  y: number;
}

export declare interface IUseTouchScrollReturn {
  // 是否在移动中
  // is moving
  isMoving: boolean;
  // deviation return value
  positions: {
    // 位移之后的结果值
    // move result
    base: IDeviation;
    // 位移开始位置
    // position before moving
    start: IPosition;
    // 当次touch偏移值
    // touch moving deviation
    deviation: IDeviation;
    // Offset value after formatting
    // 格式化之后的偏移值
    formattedDeviation: IDeviation;
  };
}

export default function useTouchScroll<E extends HTMLElement = HTMLElement>(
  param: IUseTouchScrollParam<E>,
): IUseTouchScrollReturn {
  // 初始距离，每次位移结束都会改变
  // base position
  const [base, setBase] = useState<IDeviation>({ x: 0, y: 0 });
  // 位移开始坐标
  const [start, setStart] = useState<IPosition>({ x: 0, y: 0 });
  // 每次touch拖动偏移量
  // each touch scroll deviation
  const [deviation, setDeviation] = useState<IDeviation>({ x: 0, y: 0 });
  const [formattedDeviation, setFormattedDeviation] = useState<IDeviation>({
    x: 0,
    y: 0,
  });
  const [isMoving, setIsMoving] = useState<boolean>(false);
  // 位移基数，每次moving结束都会根据基数取向最接近倍数基数值
  // move deviation base,
  // At the end of each moving, the nearest multiple base value will be oriented according to the cardinality
  const [deviationXBase] = useState<number>(param.deviationXBase || 0);
  const [deviationYBase] = useState<number>(param.deviationYBase || 0);

  useEffect(() => {
    // 防止页面滚动，要加在被移动的元素上，不能在react的绑定事件中阻止默认事件
    // Prevent page scroll,add to listener list of the element to be moving,
    // don't prevent default event in react event system
    if (param.ref.current) {
      const element = param.ref.current;
      element.addEventListener(
        'touchmove',
        (e) => {
          e.preventDefault();
        },
        {
          passive: false,
        },
      );
      element.addEventListener('touchstart', (e) => {
        const finger = e.changedTouches.item(0) as Touch;
        setStart({ x: finger.screenX, y: finger.screenY });
        setIsMoving(true);
      });
      element.addEventListener('touchmove', (e) => {
        const finger = e.changedTouches.item(0) as Touch;
        setStart((pre) => {
          setDeviation({
            x: finger.screenX - pre.x,
            y: finger.screenY - pre.y,
          });
          return pre;
        });
      });
      element.addEventListener('touchend', () => {
        setDeviation((preDeviation) => {
          setBase((preBase) => {
            let formattedX = preDeviation.x;
            let formattedY = preDeviation.y;
            if (deviationXBase) {
              formattedX = getFormatDeviation(preDeviation.x, deviationXBase);
            }
            if (deviationYBase) {
              formattedY = getFormatDeviation(preDeviation.y, deviationYBase);
            }
            setFormattedDeviation({ x: formattedX, y: formattedY });
            return {
              x: preBase.x + formattedX,
              y: preBase.y + formattedY,
            };
          });
          // 归零
          // return zero
          return { x: 0, y: 0 };
        });
        setIsMoving(false);
      });
    } else {
      console.error('please input ref');
    }
  }, []);
  return {
    isMoving,
    positions: {
      base,
      start,
      deviation,
      formattedDeviation,
    },
  };
}
