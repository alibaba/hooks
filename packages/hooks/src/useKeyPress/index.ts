import { useEffect, useRef } from 'react';
import { BasicTarget, getTargetElement } from '../utils/dom';

export type KeyPredicate = (event: KeyboardEvent) => boolean;
export type keyType = KeyboardEvent['keyCode'] | KeyboardEvent['key'];
export type KeyFilter = keyType | Array<keyType> | ((event: KeyboardEvent) => boolean);
export type EventHandler = (event: KeyboardEvent) => void;
export type keyEvent = 'keydown' | 'keyup';

export type Target = BasicTarget<HTMLElement | Document | Window>;

export type EventOption = {
  events?: Array<keyEvent>;
  target?: Target;
};

// 键盘事件 keyCode 别名
const aliasKeyCodeMap: any = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  delete: [8, 46],
};

// 键盘事件 key 别名
const aliasKeyMap: any = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  delete: ['Backspace', 'Delete'],
};

// 修饰键
const modifierKey: any = {
  ctrl: (event: KeyboardEvent) => event.ctrlKey,
  shift: (event: KeyboardEvent) => event.shiftKey,
  alt: (event: KeyboardEvent) => event.altKey,
  meta: (event: KeyboardEvent) => event.metaKey,
};

// 返回空对象
const noop = () => {};

/**
 * 判断对象类型
 * @param [obj: any] 参数对象
 * @returns String
 */
function isType(obj: any) {
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (.+)\]$/, '$1')
    .toLowerCase();
}

/**
 * 判断按键是否激活
 * @param [event: KeyboardEvent]键盘事件
 * @param [keyFilter: any] 当前键
 * @returns Boolean
 */
function genFilterKey(event: any, keyFilter: any) {
  // 浏览器自动补全 input 的时候，会触发 keyDown、keyUp 事件，但此时 event.key 等为空
  if (!event.key) {
    return false;
  }

  const type = isType(keyFilter);
  // 数字类型直接匹配事件的 keyCode
  if (type === 'number') {
    return event.keyCode === keyFilter;
  }
  // 字符串依次判断是否有组合键
  const genArr = keyFilter.split('.');
  let genLen = 0;
  for (const key of genArr) {
    // 组合键
    const genModifier = modifierKey[key];
    // key 别名
    const aliasKey = aliasKeyMap[key];
    // keyCode 别名
    const aliasKeyCode = aliasKeyCodeMap[key];
    /**
     * 满足以上规则
     * 1. 自定义组合键别名
     * 2. 自定义 key 别名
     * 3. 自定义 keyCode 别名
     * 4. 匹配 key 或 keyCode
     */
    if (
      (genModifier && genModifier(event)) ||
      (aliasKey && isType(aliasKey) === 'array'
        ? aliasKey.includes(event.key)
        : aliasKey === event.key) ||
      (aliasKeyCode && isType(aliasKeyCode) === 'array'
        ? aliasKeyCode.includes(event.keyCode)
        : aliasKeyCode === event.keyCode) ||
      event.key.toUpperCase() === key.toUpperCase()
    ) {
      genLen++;
    }
  }
  return genLen === genArr.length;
}

/**
 * 键盘输入预处理方法
 * @param [keyFilter: any] 当前键
 * @returns () => Boolean
 */
function genKeyFormater(keyFilter: any): KeyPredicate {
  const type = isType(keyFilter);
  if (type === 'function') {
    return keyFilter;
  }
  if (type === 'string' || type === 'number') {
    return (event: KeyboardEvent) => genFilterKey(event, keyFilter);
  }
  if (type === 'array') {
    return (event: KeyboardEvent) => keyFilter.some((item: any) => genFilterKey(event, item));
  }
  return keyFilter ? () => true : () => false;
}

const defaultEvents: Array<keyEvent> = ['keydown'];

function useKeyPress(
  keyFilter: KeyFilter,
  eventHandler: EventHandler = noop,
  option: EventOption = {},
) {
  const { events = defaultEvents, target } = option;
  const callbackRef = useRef(eventHandler);
  callbackRef.current = eventHandler;

  useEffect(() => {
    const callbackHandler = (event) => {
      const genGuard: KeyPredicate = genKeyFormater(keyFilter);
      if (genGuard(event)) {
        return callbackRef.current(event);
      }
    };

    const el = getTargetElement(target, window)!;

    for (const eventName of events) {
      el.addEventListener(eventName, callbackHandler);
    }
    return () => {
      for (const eventName of events) {
        el.removeEventListener(eventName, callbackHandler);
      }
    };
  }, [events, keyFilter, target]);
}

export default useKeyPress;
