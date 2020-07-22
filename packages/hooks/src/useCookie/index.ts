import { useState } from 'react';

function isString(v: any): v is string {
  return Object.prototype.toString.call(v).slice(8, -1) === 'String';
}
function isFunction(v: any): v is Function {
  return Object.prototype.toString.call(v).slice(8, -1) === 'Function';
}

export interface IFuncUpdater<T> {
  (previousState?: T): T;
}
export type CookieDefaultValue<T> = T | IFuncUpdater<T>;

function tryJSON<T = any, U = any>(value: string, defaultValue?: U): T | U | string {
  try {
    return JSON.parse(value);
  } catch (e) {}
  return defaultValue || value;
}

function setCookie<T = any>(
  key: string,
  value: T,
  expires: Date | null = null,
  timestamp: number = 86400000,
  path: string = '/',
) {
  const timer = new Date(+new Date() + timestamp);
  const strValue = isString(value) ? value : JSON.stringify(value);
  document.cookie = `${key}=${strValue};expires=${expires ? expires : timer};path=${path}`;
}

function getCookie(key: string): string {
  return document.cookie.replace(
    new RegExp(`(?:(?:^|.*;)\\s*${key}\\s*\\=\\s*([^;]*).*$)|^.*$`),
    '$1',
  );
}

function hasCookie(key: string): boolean {
  return new RegExp(`(?:^|;\\s*)${key}\\s*\\=`).test(document.cookie);
}

function removeCookie(key: string, path: string): void {
  console.log(key);
  setCookie(name, '', null, -86400000, path);
}

interface IOptions<T> {
  defaultValue?: CookieDefaultValue<T>;
  timestamp?: number;
  path?: string;
  expires?: Date;
}

const optionsDefault = {
  defaultValue: undefined,
  timestamp: 86400000,
  path: '/',
  expires: null,
};

function useCookie<T = any>(key: string, options?: IOptions<T>): [T, CookieDefaultValue<T>];

function useCookie<T = any>(key: string, options: IOptions<T> = optionsDefault) {
  const { path, expires, timestamp, defaultValue } = options;

  function getStateValue(): T | undefined {
    if (hasCookie(key)) {
      return tryJSON<T>(getCookie(key));
    } else if (isFunction(defaultValue)) {
      return defaultValue();
    }
    return defaultValue;
  }

  const [state, setState] = useState<T | undefined>(() => {
    if (hasCookie(key)) {
      return tryJSON<T>(getCookie(key));
    } else if (isFunction(defaultValue)) {
      return defaultValue();
    }
    return defaultValue;
  });

  function updateState(value?: T | IFuncUpdater<T>) {
    if (typeof value === 'undefined') {
      removeCookie(key, path);
      setState(undefined);
    } else if (isFunction(value)) {
      const previousState = getStateValue();
      const currentState = value(previousState);
      setCookie(
        key,
        isString(currentState) ? currentState : JSON.stringify(currentState),
        expires,
        timestamp,
        path,
      );
      setState(currentState);
    } else {
      setCookie(key, isString(value) ? value : JSON.stringify(value), expires, timestamp, path);
      setState(value);
    }
  }

  return [state, updateState];
}

export default useCookie;
