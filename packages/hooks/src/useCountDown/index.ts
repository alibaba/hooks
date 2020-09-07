import { useCallback, useEffect, useMemo, useState } from 'react';

export const parseMs = (milliseconds: number): FormattedRes => {
  const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;

  return {
    days: roundTowardsZero(milliseconds / 86400000),
    hours: roundTowardsZero(milliseconds / 3600000) % 24,
    minutes: roundTowardsZero(milliseconds / 60000) % 60,
    seconds: Math.abs(roundTowardsZero(milliseconds / 1000) % 60),
    milliseconds: Math.abs(roundTowardsZero(milliseconds) % 1000),
  };
};

export type TDate = Date | number | string | undefined;

export type Options = {
  targetDate?: TDate;
  intervalTime?: number;
};

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const useCountdown = (options?: Options) => {
  const { targetDate, intervalTime = 1000 } = options || {};

  const calcLeft = useCallback((t?: TDate) => {
    if (!t) {
      return 0;
    }
    const left = new Date(t).getTime() - new Date().getTime();
    if (left < 0) {
      return 0;
    }
    return left;
  }, []);

  const [target, setTargetDate] = useState<TDate>(targetDate);
  const [timeLeft, setTimeLeft] = useState(() => calcLeft(target));

  useEffect(() => {
    if (!target) {
      // for stop
      setTimeLeft(0);
      return;
    }

    // 立即执行一次
    setTimeLeft(calcLeft(target));

    const timer = setInterval(() => {
      const targetLeft = calcLeft(target);
      setTimeLeft(targetLeft);
      if (targetLeft === 0) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [target, intervalTime, calcLeft]);

  const formattedRes = useMemo(() => {
    return parseMs(timeLeft);
  }, [timeLeft]);

  return [timeLeft, setTargetDate, formattedRes] as const;
};

export default useCountdown;
