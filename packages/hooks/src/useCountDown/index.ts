import { useEffect, useState } from 'react';

export declare interface ICountDownParam {
  baseTime: number;
  interval?: number;
  decreasing?: number;
}

export declare interface ICountDownTime {
  day: number;
  hour: number;
  minute: number;
  second: number;
}

export declare interface ICountDownHook {
  time: ICountDownTime;
  remaining: number;
  /**
   * 重新开始任务
   * restart task
   * @param newBase 可指定重新开始的新初始值  can specify a new initial value for the restart
   */
  restartTask: (newBase?: number) => any;
  stopTask: () => any;
  continueTask: () => any;
  setInterval: (interval: number) => any;
  setDecreasing: (decreasing: number) => any;
}

function useCountDown({
  baseTime,
  interval = 1000,
  decreasing = 1000,
}: ICountDownParam): ICountDownHook {
  // 最初剩余时间
  // Initial remaining time
  const [baseTimeState, setBaseTimeState] = useState(baseTime);
  // 剩余时间
  // remaining time
  const [remaining, setRemaining] = useState(baseTime);
  // 间隔时间
  // interval time
  const [intervalState, setIntervalState] = useState(interval);
  // 递减值
  // decreasing value
  const [decreasingState, setDecreasingState] = useState(decreasing);
  // start or stop countdown flag
  const [flag, setFlag] = useState(true);

  const continueTask: ICountDownHook['continueTask'] = function () {
    setFlag(true);
  };

  const restartTask: ICountDownHook['restartTask'] = function (newBase?) {
    if (newBase) {
      setBaseTimeState(newBase);
    }
    setRemaining(newBase || baseTimeState);
    setFlag(true);
  };

  const stopTask: ICountDownHook['stopTask'] = function () {
    setFlag(false);
  };

  const setInterval: ICountDownHook['setInterval'] = function (intervalParam) {
    setIntervalState(intervalParam);
  };

  const setDecreasing: ICountDownHook['setDecreasing'] = function (decreasingParam) {
    setDecreasingState(decreasingParam);
  };

  useEffect(() => {
    let timeout = setTimeout(() => {}, 0);
    if (flag) {
      timeout = setTimeout(() => {
        if (remaining > 0) {
          setRemaining(remaining - decreasingState > 0 ? remaining - decreasingState : 0);
        }
      }, intervalState);
    }
    return () => {
      clearTimeout(timeout);
    };
  });

  const time: ICountDownTime = {
    day: Math.floor(remaining / 1000 / 60 / 60 / 24),
    hour: Math.floor((remaining / 1000 / 60 / 60) % 24),
    minute: Math.floor((remaining / 1000 / 60) % 60),
    second: Math.floor((remaining / 1000) % 60),
  };

  return {
    time,
    remaining,
    restartTask,
    stopTask,
    continueTask,
    setInterval,
    setDecreasing,
  };
}

export default useCountDown;
