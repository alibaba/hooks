import { useEffect, useRef, useState } from 'react';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import isBrowser from '../utils/isBrowser';

export interface Options {
  /**
   * Element whose scrolling is locked.
   * @default document.body
   */
  target?: BasicTarget<HTMLElement>;
  /** Lock as soon as the hook mounts. */
  defaultLocked?: boolean;
  /**
   * Compensate the hidden scrollbar with padding-right so the page does not
   * shift when the body stops scrolling. Body only.
   * @default true
   */
  compensateScrollbar?: boolean;
  onLock?: () => void;
  onUnlock?: () => void;
}

export interface Actions {
  lock: () => void;
  unlock: () => void;
  toggle: () => void;
}

interface LockRecord {
  count: number;
  overflow: string;
  paddingRight: string;
}

// Every lock on the same element shares one record: two components locking the
// page keep it locked until the last one releases, and the original inline
// styles are restored exactly once.
const locks = new WeakMap<HTMLElement, LockRecord>();

function applyLock(element: HTMLElement, compensateScrollbar: boolean) {
  const record = locks.get(element);
  if (record) {
    record.count += 1;
    return;
  }

  const overflow = element.style.overflow;
  const paddingRight = element.style.paddingRight;
  element.style.overflow = 'hidden';

  if (compensateScrollbar && element === document.body) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar > 0) {
      const current = Number.parseFloat(window.getComputedStyle(element).paddingRight) || 0;
      element.style.paddingRight = `${current + scrollbar}px`;
    }
  }

  locks.set(element, { count: 1, overflow, paddingRight });
}

function releaseLock(element: HTMLElement) {
  const record = locks.get(element);
  if (!record) {
    return;
  }
  record.count -= 1;
  if (record.count > 0) {
    return;
  }
  element.style.overflow = record.overflow;
  element.style.paddingRight = record.paddingRight;
  locks.delete(element);
}

/**
 * Lock scrolling on an element, with a lock shared by every caller.
 *
 * The returned action set is safe to call repeatedly: `lock` is a no-op while
 * this hook already holds the lock, and unmounting releases it. On the server
 * the hook reports `defaultLocked` and touches no DOM.
 */
const useScrollLock = (options: Options = {}) => {
  const { target, defaultLocked = false, compensateScrollbar = true, onLock, onUnlock } = options;

  const [locked, setLocked] = useState(defaultLocked);
  const lockedElementRef = useRef<HTMLElement | null>(null);
  const compensateRef = useLatest(compensateScrollbar);
  // `defaultLocked` is mount-time only: freeze it so a later prop change does
  // not re-apply a lock the caller only asked for initially.
  const [initialLocked] = useState(defaultLocked);
  const onLockRef = useLatest(onLock);
  const onUnlockRef = useLatest(onUnlock);

  const resolveElement = useMemoizedFn((): HTMLElement | null => {
    if (!isBrowser) {
      return null;
    }
    return (target ? getTargetElement(target) : undefined) ?? document.body;
  });

  const release = useMemoizedFn(() => {
    const element = lockedElementRef.current;
    if (!element) {
      return false;
    }
    lockedElementRef.current = null;
    releaseLock(element);
    onUnlockRef.current?.();
    return true;
  });

  const lock = useMemoizedFn(() => {
    if (lockedElementRef.current) {
      return;
    }
    const element = resolveElement();
    if (!element) {
      return;
    }
    applyLock(element, compensateRef.current);
    lockedElementRef.current = element;
    setLocked(true);
    onLockRef.current?.();
  });

  const unlock = useMemoizedFn(() => {
    if (release()) {
      setLocked(false);
    }
  });

  const toggle = useMemoizedFn(() => {
    if (lockedElementRef.current) {
      unlock();
    } else {
      lock();
    }
  });

  useEffect(() => {
    if (initialLocked) {
      lock();
    }
    return () => {
      // Unmounting must not leave the page locked; no state update here.
      release();
    };
  }, [initialLocked, lock, release]);

  return [locked, { lock, unlock, toggle }] as const;
};

export default useScrollLock;
