import { useEffect, useState, useRef, useCallback } from 'react';

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

export type TDate = Date | number | string | undefined | null;

export type TOpts = {
  dateFrom?: TDate;
  intervalTime?: number | null;
  formatter?: (timeStamp: number, formatted: FormattedRes) => any;
};

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const useCountdown = (
  dateEnd: TDate,
  options?: Partial<TOpts>,
): [number, (target?: any) => void, FormattedRes] => {
  const intervalTime = options?.intervalTime ?? 1000;
  const [target, setTarget] = useState(dateEnd);

  const formatter = options?.formatter;

  const parser = useCallback(
    (timeLeft: number, formatter?: any) =>
      formatter ? formatter(timeLeft, parseMs(timeLeft)) : parseMs(timeLeft),
    [],
  );

  const dateFrom = options?.dateFrom ? new Date(options?.dateFrom).getTime() : Date.now();

  const calcLeft = useCallback(
    (targetDate?: TDate) => new Date(targetDate ?? target ?? Date.now()).getTime() - dateFrom,
    [],
  );

  const [timeLeft, setTimeLeft] = useState<number>(() => calcLeft());

  const [formattedRes, setFormattedRes] = useState<FormattedRes>(parser(timeLeft, formatter));

  const timerRef = useRef<any>();

  const invoke = (targetDate?: TDate) => {
    setTarget(targetDate);
    setTimeLeft(() => calcLeft(targetDate));
  };

  useEffect(() => {
    if (!target) return;

    setFormattedRes(parser(timeLeft, formatter));

    timerRef.current = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return current - intervalTime;
      });
    }, intervalTime);

    return () => clearInterval(timerRef.current || null);
  }, [intervalTime, dateEnd, timeLeft]);

  return [timeLeft, invoke, formattedRes];
};

export default useCountdown;
