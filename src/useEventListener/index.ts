/**
 * 统一封装dom事件
 */
import { MutableRefObject, useEffect, useRef } from 'react';

// 定义当前的target-dom
type Target = HTMLElement | Window;

// 
type Options = { dom?: Dom; capture?: boolean; once?: boolean; passive?: boolean; }
type Dom = Target | (() => Target) | null;

/**
 * 
 * @param eventName： 事件名称
 * @param handler 处理函数
 * @param options 设置(可选)
 * options: {
 *  dom: 可选项，如果未传入则会监听返回结果中的 ref ，否则会监听传入的节点
 *  capture:
 *  once: 
 *  passive: 
 * }
 */
function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: { capture?: boolean; once?: boolean; passive?: boolean; },
): MutableRefObject<T>;

/**
 * 
 * @param eventName： 事件名称
 * @param handler 处理函数
 * @param options 设置(可选)
 * options: {
 *  dom: 可选项，如果未传入则会监听返回结果中的 ref ，否则会监听传入的节点
 *  capture: 可选项，listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
 *  once: 可选项，listener 在添加之后最多只调用一次。如果是 true ， listener 会在其被调用之后自动移除。
 *  passive: 可选项，设置为 true 时，表示 listener 永远不会调用 preventDefault() 。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
 * } 
 */
function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: { dom: Dom, capture?: boolean; once?: boolean; passive?: boolean; },
): void

function useEventListener<T extends Target = HTMLElement>(
  eventName: string,
  handler: Function,
  options?: Options,
) {
  const ref = useRef<T>();
  const savedHandler = useRef<Function>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const passedInElement = options &&
      (typeof options.dom === 'function' ? options.dom() : options.dom);
    let element = passedInElement ? passedInElement : ref.current || window;
    const isSupported = element.addEventListener;
    if (!isSupported) return;
    const eventListener = (
      event: Event,
    ): EventListenerOrEventListenerObject | AddEventListenerOptions =>
      savedHandler.current && savedHandler.current(event);

    element.addEventListener(eventName, eventListener,{
      capture:options?.capture,
      once:options?.once,
      passive:options?.passive
    });

    return () => {
      element.removeEventListener(eventName, eventListener,{
        capture:options?.capture,
      });
    };
  }, [eventName, options, ref.current]);
  return ref;
}

export default useEventListener;
