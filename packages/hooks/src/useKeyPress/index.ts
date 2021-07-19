import useDeepCompareEffect from '../useDeepCompareEffect';
import useLatest from '../useLatest';
import { getTargetElement } from '../utils/dom2';
import type { BasicTarget } from '../utils/dom2';

export type KeyPredicate = (event: KeyboardEvent) => boolean;
export type keyType = KeyboardEvent['keyCode'] | KeyboardEvent['key'];
export type KeyFilter = keyType | keyType[] | ((event: KeyboardEvent) => boolean);
export type EventHandler = (event: KeyboardEvent) => void;
export type KeyEvent = 'keydown' | 'keyup';

export type Target = BasicTarget<HTMLElement | Document | Window>;

export type Options = {
  events?: KeyEvent[];
  target?: Target;
};

// 键盘事件 keyCode 别名
const aliasKeyCodeMap = {
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
const aliasKeyMap = {
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
const modifierKey = {
  ctrl: (event: KeyboardEvent) => event.ctrlKey,
  shift: (event: KeyboardEvent) => event.shiftKey,
  alt: (event: KeyboardEvent) => event.altKey,
  meta: (event: KeyboardEvent) => event.metaKey,
};

/**
 * 判断按键是否激活
 * @param [event: KeyboardEvent]键盘事件
 * @param [keyFilter: any] 当前键
 * @returns Boolean
 */
function genFilterKey(event: KeyboardEvent, keyFilter: keyType) {
  // 浏览器自动补全 input 的时候，会触发 keyDown、keyUp 事件，但此时 event.key 等为空
  if (!event.key) {
    return false;
  }

  // 数字类型直接匹配事件的 keyCode
  if (typeof keyFilter === 'number') {
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
      (aliasKey && Array.isArray(aliasKey)
        ? aliasKey.includes(event.key)
        : aliasKey === event.key) ||
      (aliasKeyCode && Array.isArray(aliasKeyCode)
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
function genKeyFormater(keyFilter: KeyFilter): KeyPredicate {
  if (typeof keyFilter === 'function') {
    return keyFilter;
  }
  if (typeof keyFilter === 'string' || typeof keyFilter === 'number') {
    return (event: KeyboardEvent) => genFilterKey(event, keyFilter);
  }
  if (Array.isArray(keyFilter)) {
    return (event: KeyboardEvent) => (keyFilter).some((item) => genFilterKey(event, item));
  }
  return keyFilter ? () => true : () => false;
}

const defaultEvents: KeyEvent[] = ['keydown'];

function useKeyPress(
  keyFilter: KeyFilter,
  eventHandler: EventHandler,
  option?: Options,
) {
  const { events = defaultEvents, target } = option || {};
  const eventHandlerRef = useLatest(eventHandler);

  useDeepCompareEffect(() => {
    const el = getTargetElement(target, window);
    if (!el) {
      return;
    }

    const callbackHandler = (event: KeyboardEvent) => {
      const genGuard: KeyPredicate = genKeyFormater(keyFilter);
      if (genGuard(event)) {
        return eventHandlerRef.current?.(event);
      }
    };

    for (const eventName of events) {
      el.addEventListener(eventName, callbackHandler);
    }
    return () => {
      for (const eventName of events) {
        el.removeEventListener(eventName, callbackHandler);
      }
    };
  }, [
    events,
    typeof keyFilter === 'function' ? undefined : keyFilter,
    typeof target === 'function' ? undefined : target
  ]);
}

export default useKeyPress;
