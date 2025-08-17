import { useEffect, useState } from 'react';
import isBrowser from '../utils/isBrowser';

type Subscriber = () => void;

const subscribers = new Set<Subscriber>();

type ResponsiveConfig = Record<string, number>;
type ResponsiveInfo = Record<string, boolean>;

let info: ResponsiveInfo;

let responsiveConfig: ResponsiveConfig = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

function handleResize() {
  const oldInfo = info;
  calculate();
  if (oldInfo === info) {
    return;
  }
  for (const subscriber of subscribers) {
    subscriber();
  }
}

let listening = false;

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

function useResponsive() {
  if (isBrowser && !listening) {
    info = {};
    calculate();
    window.addEventListener('resize', handleResize);
    listening = true;
  }
  const [state, setState] = useState<ResponsiveInfo>(info);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    // In React 18's StrictMode, useEffect perform twice, resize listener is remove, so handleResize is never perform.
    // https://github.com/alibaba/hooks/issues/1910
    if (!listening) {
      window.addEventListener('resize', handleResize);
    }

    const subscriber = () => {
      setState(info);
    };

    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        window.removeEventListener('resize', handleResize);
        listening = false;
      }
    };
  }, []);

  return state;
}

export default useResponsive;
