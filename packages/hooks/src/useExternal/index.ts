import { useState, useRef, useEffect, useMemo } from 'react';
import { getTargetElement, BasicTarget } from '../utils/dom';

export interface Options {
  type?: 'js' | 'css' | 'img';
  media?: HTMLLinkElement['media'];
  async?: boolean;
  target?: BasicTarget;
}

export type Status = 'unset' | 'loading' | 'ready' | 'error';

export type Action = {
  toggle: () => void;
  load: () => void;
  unload: () => void;
};

export type ExternalElement = HTMLScriptElement | HTMLLinkElement | HTMLImageElement;

export default function useExternal(path: string, options?: Options): [Status, Action] {
  const isPath = typeof path === 'string' && path !== '';

  const [status, setStatus] = useState<Status>(isPath ? 'loading' : 'unset');

  const [active, setActive] = useState(isPath);

  const ref = useRef<ExternalElement>();

  useEffect(() => {
    ref.current?.remove();

    if (!isPath || !active) {
      setStatus('unset');
      ref.current = undefined;
      return;
    }

    setStatus('loading');
    // Create external element
    const pathname = path.replace(/[|#].*$/, '');
    if (options?.type === 'css' || /(^css!|\.css$)/.test(pathname)) {
      // css
      ref.current = document.createElement('link');
      ref.current.rel = 'stylesheet';
      ref.current.href = path;
      ref.current.media = options?.media || 'all';
      // IE9+
      let isLegacyIECss = 'hideFocus' in ref.current;
      // use preload in IE Edge (to detect load errors)
      if (isLegacyIECss && ref.current.relList) {
        ref.current.rel = 'preload';
        ref.current.as = 'style';
      }
      ref.current.setAttribute('data-status', 'loading');
      document.head.appendChild(ref.current);
    } else if (options?.type === 'js' || /(^js!|\.js$)/.test(pathname)) {
      // javascript
      ref.current = document.createElement('script');
      ref.current.src = path;
      ref.current.async = options?.async === undefined ? true : options?.async;
      ref.current.setAttribute('data-status', 'loading');
      document.body.appendChild(ref.current);
    } else if (options?.type === 'img' || /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(pathname)) {
      // image
      ref.current = document.createElement('img');
      ref.current.src = path;
      ref.current.setAttribute('data-status', 'loading');
      // append to wrapper
      const wrapper = (getTargetElement(options?.target) as HTMLElement) || document.body;
      if (wrapper) {
        wrapper.appendChild(ref.current);
      }
    }else{
      // do nothing
      console.error(
        "Cannot infer the type of external resource, and please provide a type ('js' | 'css' | 'img'). " +
          "Refer to the https://ahooks.js.org/hooks/dom/use-external/#options"
      )
    }

    if(!ref.current) return

    // Bind setAttribute Event
    const setAttributeFromEvent = (event: Event) => {
      ref.current?.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error');
    };
    ref.current.addEventListener('load', setAttributeFromEvent);
    ref.current.addEventListener('error', setAttributeFromEvent);
    const setStateFromEvent = (event: Event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error');
    };
    ref.current.addEventListener('load', setStateFromEvent);
    ref.current.addEventListener('error', setStateFromEvent);
    return () => {
      ref.current?.removeEventListener('load', setStateFromEvent);
      ref.current?.removeEventListener('error', setStateFromEvent);
    };
  }, [path, active]);

  const action = useMemo(() => {
    const unload = () => setActive(false);
    const load = () => setActive(true);
    const toggle = () => setActive((value) => !value);
    return { toggle, load, unload };
  }, [setActive]);

  return [status, action];
}
