import { useState } from 'react';

function isString(v: any): v is string {
  return Object.prototype.toString.call(v).slice(8, -1) === 'String';
}
function isFunction(v: any): v is Function {
  return Object.prototype.toString.call(v).slice(8, -1) === 'Function';
}

function tryJSON<T = any, U = any>(value: string, defaultValue?: U): T | U | string {
  try {
    return JSON.parse(value);
  } catch (e) {}
  return defaultValue || value;
}

/**
 * 设置cookie
 * @param  key cookie名称
 * @param  value cookie值
 * @param  expires 过期时间
 * @param  timestamp 时间戳，从当前时间开始
 * @param  path 路径
 * @return undefined
 */
interface ISetCookie<T> {
  key: string;
  value: T;
  expires?: Date;
  timestamp?: number;
  path?: string;
}
function setCookie<T = any>(options: ISetCookie<T>) {
  const { key, value, expires, path = '/', timestamp = 86400000 } = options;
  const timer = new Date(+new Date() + timestamp);
  const strValue = isString(value) ? value : JSON.stringify(value);
  document.cookie = `${key}=${strValue};expires=${expires ? expires : timer};path=${path}`;
}

// 获取cookie
function getCookie(key: string): string {
  return document.cookie.replace(
    new RegExp(`(?:(?:^|.*;)\\s*${key}\\s*\\=\\s*([^;]*).*$)|^.*$`),
    '$1',
  );
}
// 是否拥有cookie
function hasCookie(key: string): boolean {
  return new RegExp(`(?:^|;\\s*)${key}\\s*\\=`).test(document.cookie);
}
// 删除
function removeCookie(key: string, path: string): void {
  setCookie({ key, path, value: '', timestamp: -86400000 });
}

export interface IFuncUpdater<T> {
  (previousState?: T): T;
}
export type IUseCookieStateResult<T> = [T | undefined, (value?: CookieDefaultValue<T>) => void];
export type CookieDefaultValue<T> = T | IFuncUpdater<T>;
export interface IOptions<T = any> {
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

function useCookie<T = any>(key: string, options?: IOptions<T>): IUseCookieStateResult<T>;

function useCookie<T = any>(
  key: string,
  options: IOptions<T> = optionsDefault,
): IUseCookieStateResult<T> {
  const { path, expires, timestamp, defaultValue } = options;

  // 获取cookie / 默认值
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
      setCookie({
        key,
        value: isString(currentState) ? currentState : JSON.stringify(currentState),
        expires,
        timestamp,
        path,
      });
      setState(currentState);
    } else {
      setCookie({
        key,
        value: isString(value) ? value : JSON.stringify(value),
        expires,
        timestamp,
        path,
      });
      setState(value);
    }
  }

  return [state, updateState];
}

export default useCookie;
