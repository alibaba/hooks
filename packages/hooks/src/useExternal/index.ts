import { useState, useRef, useEffect, useMemo } from 'react';
import { getTargetElement, BasicTarget } from '../utils/dom';

export interface Options {
  media?: HTMLLinkElement['media'];
  async?: boolean;
  target?: BasicTarget;
}

export type Status = 'unset' | 'loading' | 'ready' | 'error';

export type Action = {
  toggle: (newPath?: string) => void;
  load: (newPath?: string) => void;
  unload: () => void;
};

export type ExternalElement = HTMLScriptElement | HTMLLinkElement | HTMLImageElement;

export default function useScript(path: string, options?: Options): [Status, Action] {
  const [status, setStatus] = useState<Status>(path ? 'loading' : 'unset');

  const [src, setSrc] = useState(path);

  const ref = useRef<ExternalElement>();

  useEffect(() => {
    setSrc(path);
  }, [path]);

  useEffect(() => {
    ref.current?.remove();

    if (!src) {
      setStatus('unset');
      ref.current = undefined;
      return;
    }

    ref.current =
      (document.querySelector(`script[src="${src}"]`) as HTMLScriptElement) ||
      (document.querySelector(`link[href="${src}"]`) as HTMLLinkElement) ||
      (document.querySelector(`img[src="${src}"]`) as HTMLImageElement);

    if (!ref.current) {
      // Create external element

      const pathname = src.replace(/[|#].*$/, '');

      if (/(^css!|\.css$)/.test(pathname)) {
        // css
        ref.current = document.createElement('link');
        ref.current.rel = 'stylesheet';
        ref.current.href = src;
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
      } else if (/(^js!|\.js$)/.test(pathname)) {
        // javascript
        ref.current = document.createElement('script');
        ref.current.src = src;
        ref.current.async = options?.async === undefined ? true : options?.async;
        ref.current.setAttribute('data-status', 'loading');
        document.body.appendChild(ref.current);
      } else {
        // image
        ref.current = document.createElement('img');
        ref.current.src = src;
        ref.current.setAttribute('data-status', 'loading');
        // append to wrapper
        const wrapper = (getTargetElement(options?.target) as HTMLElement) || document.body;
        if (wrapper) {
          wrapper.appendChild(ref.current);
        }
      }

      // Bind setAttribute Event
      const setAttributeFromEvent = (event: Event) => {
        ref.current?.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error');
      };
      ref.current.addEventListener('load', setAttributeFromEvent);
      ref.current.addEventListener('error', setAttributeFromEvent);
      setStatus('loading');
    } else {
      setStatus((ref.current.getAttribute('data-status') as Status) || 'unset');
    }
    const setStateFromEvent = (event: Event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error');
    };
    ref.current.addEventListener('load', setStateFromEvent);
    ref.current.addEventListener('error', setStateFromEvent);
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('load', setStateFromEvent);
        ref.current.removeEventListener('error', setStateFromEvent);
      }
    };
  }, [src]);

  const action = useMemo(() => {
    const unload = () => setSrc('');

    const load = (newPath?: string) => setSrc(newPath || path);

    const toggle = (newPath?: string) => (ref.current ? unload() : load(newPath));

    return { toggle, load, unload };
  }, [path, src]);

  return [status, action];
}
