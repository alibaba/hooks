import { useMemo } from 'react';

export default function useGreetings(): string {
  return useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour <= 11) return 'morning';
    else if (hour >= 12 && hour <= 16) return 'afternoon';
    else if (hour >= 17 && hour <= 20) return 'evening';
    else return 'night';
  }, [new Date().getHours()]);
}
