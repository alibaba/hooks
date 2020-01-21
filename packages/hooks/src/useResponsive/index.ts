import { useEffect, useState } from 'react';

type Subscriber = () => void;

const subscribers = new Set<Subscriber>();

interface ResponsiveConfig {
  [key: string]: number;
}
interface ResponsiveInfo {
  [key: string]: boolean;
}

let info: ResponsiveInfo;

let responsiveConfig: ResponsiveConfig = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

function init() {
  if (info) return;
  info = {};
  calculate();
  window.addEventListener('resize', () => {
    const oldInfo = info;
    calculate();
    if (oldInfo === info) return;
    for (const subscriber of subscribers) {
      subscriber();
    }
  });
}

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

export function configResponsive(config: ResponsiveConfig) {
  responsiveConfig = config;
  if (info) calculate();
}

export function useResponsive() {
  init();
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
