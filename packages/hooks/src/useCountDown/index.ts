import { useEffect, useMemo, useState } from 'react';

export type TDate = Date | number | string | undefined;

export type Options = {
  targetDate?: TDate;
  interval?: number;
};

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const calcLeft = (t?: TDate) => {
  if (!t) {
    return 0;
  }
  const left = new Date(t).getTime() - new Date().getTime();
  if (left < 0) {
    return 0;
  }
  return left;
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

const useCountdown = (options?: Options) => {
  const { targetDate, interval = 1000 } = options || {};

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
    }, interval);

    return () => clearInterval(timer);
  }, [target, interval]);

  const formattedRes = useMemo(() => {
    return parseMs(timeLeft);
  }, [timeLeft]);

  return [timeLeft, setTargetDate, formattedRes] as const;
};

export default useCountdown;
