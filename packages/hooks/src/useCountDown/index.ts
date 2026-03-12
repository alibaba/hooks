import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import useLatest from '../useLatest';
import { isNumber } from '../utils/index';

export type TDate = dayjs.ConfigType;

export interface Options {
  leftTime?: number;
  targetDate?: TDate;
  interval?: number;
  currentServerTime?: number;
  onEnd?: () => void;
}

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const calcLeft = (
  target?: TDate,
  momentTimeInfo?: {
    serverTime: number;
    localTime: number;
  }
) => {
  if (!target) {
    return 0;
  }
  // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
  const left =
    // 如果服务器时间存在，则使用服务器时间，并动态计算时间差值，否则使用本地时间
    dayjs(target).valueOf() -
    (momentTimeInfo?.serverTime
      ? momentTimeInfo.serverTime + Date.now() - momentTimeInfo.localTime
      : Date.now());
  return left < 0 ? 0 : left;
};

const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
};

const useCountdown = (options: Options = {}) => {
  const {
    leftTime,
    targetDate,
    interval = 1000,
    currentServerTime,
    onEnd,
  } = options || {};

  /** 缓存此刻时间，保存当前服务器时间和本地时间，用于动态计算时间差，单位ms */
  const momentTimeInfo = useMemo(
    () => ({
      serverTime: currentServerTime || 0,
      localTime: currentServerTime ? Date.now() : 0,
    }),
    [currentServerTime]
  );

  const memoLeftTime = useMemo<TDate>(() => {
    return isNumber(leftTime) && leftTime > 0
      ? // 如果传入服务器时间，则使用服务器时间,并动态计算时间差值，否则使用本地时间
        (momentTimeInfo.serverTime
          ? momentTimeInfo.serverTime + Date.now() - momentTimeInfo.localTime
          : Date.now()) + leftTime
      : undefined;
  }, [leftTime, momentTimeInfo]);

  const target = 'leftTime' in options ? memoLeftTime : targetDate;

  const [timeLeft, setTimeLeft] = useState(() =>
    calcLeft(target, momentTimeInfo)
  );

  const onEndRef = useLatest(onEnd);

  useEffect(() => {
    if (!target) {
      // for stop
      setTimeLeft(0);
      return;
    }

    // 立即执行一次
    setTimeLeft(calcLeft(target, momentTimeInfo));

    const timer = setInterval(() => {
      const targetLeft = calcLeft(target, momentTimeInfo);
      setTimeLeft(targetLeft);
      if (targetLeft === 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, interval, momentTimeInfo]);

  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft]);

  return [timeLeft, formattedRes] as const;
};

export default useCountdown;
