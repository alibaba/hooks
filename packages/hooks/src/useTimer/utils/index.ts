const pad = (value: number): string =>
  value > 100 ? String(value) : `0${Math.floor(value)}`.slice(-2);

const getRemainingTime = (deadline: number): number => {
  const currentTime = Date.now();
  return deadline - currentTime;
};

const formatTime = (time: number, isAbs: boolean = false) => {
  const remainingTime = isAbs ? Math.abs(getRemainingTime(time)) : getRemainingTime(time);
  if (remainingTime < 0) {
    // 如果小于0，代表从其他tab切回来，时间已经过了endTime，所以直接显示0即可。
    return {
      remainingTime: 0,
      seconds: '00',
      minutes: '00',
      hours: '00',
      days: '00',
    };
  }
  const seconds = pad(Math.floor(remainingTime / 1000) % 60);
  const minutes = pad(Math.floor(remainingTime / (60 * 1000)) % 60);
  const hours = pad(Math.floor(remainingTime / (60 * 60 * 1000)) % 24);
  const days = pad(Math.floor(remainingTime / (24 * 60 * 60 * 1000)));

  return {
    remainingTime,
    seconds,
    minutes,
    hours,
    days,
  };
};
export { pad, getRemainingTime, formatTime };
