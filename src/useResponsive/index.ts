import { useEffect, useState } from 'react';

type Subscriber = () => void;

const subscribers = new Set<Subscriber>();

interface ResponsiveConfig {
  [key: string]: number;
}
interface ResponsiveInfo {
  [key: string]: boolean;
}

let responsiveConfig: ResponsiveConfig = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export function configResponsive(config: ResponsiveConfig) {
  responsiveConfig = config;
}

let info: ResponsiveInfo = {};

function calculate() {
  const width = window.innerWidth;
  const newInfo = {} as ResponsiveInfo;
  let shouldUpdate = false;
  for (const key of Object.keys(responsiveConfig)) {
    newInfo[key] = width >= responsiveConfig[key];
    if (newInfo[key] !== info[key]) {
      shouldUpdate = true;
    }
  }
  if (shouldUpdate) {
    info = newInfo;
  }
}
calculate();

window.addEventListener('resize', () => {
  const oldInfo = info;
  calculate();
  if (oldInfo === info) return;
  for (const subscriber of subscribers) {
    subscriber();
  }
});

export function useResponsive() {
  const [state, setState] = useState<ResponsiveInfo>(info);

  useEffect(() => {
    const subscriber = () => {
      setState(info);
    };
    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
    };
  }, []);

  return state;
}
