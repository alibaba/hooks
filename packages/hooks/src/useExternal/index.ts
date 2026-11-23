import { useEffect, useState } from 'react';

type JsOptions = {
  type: 'js';
  js?: Partial<HTMLScriptElement>;
  keepWhenUnused?: boolean;
};

type CssOptions = {
  type: 'css';
  css?: Partial<HTMLStyleElement>;
  keepWhenUnused?: boolean;
};

type DefaultOptions = {
  type?: never;
  js?: Partial<HTMLScriptElement>;
  css?: Partial<HTMLStyleElement>;
  keepWhenUnused?: boolean;
};

export type Options = JsOptions | CssOptions | DefaultOptions;

// Only elements inserted by useExternal participate in automatic removal.
const managedResources = new WeakMap<Element, { users: number }>();

export type Status = 'unset' | 'loading' | 'ready' | 'error';

interface LoadResult {
  ref: Element;
  status: Status;
}

type LoadExternal = <T>(path: string, props?: Partial<T>) => LoadResult;

const trackResourceStatus = (element: Element) => {
  managedResources.set(element, { users: 0 });
  element.setAttribute('data-status', 'loading');
  const handler = (event: Event) => {
    element.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error');
    element.removeEventListener('load', handler);
    element.removeEventListener('error', handler);
  };
  element.addEventListener('load', handler);
  element.addEventListener('error', handler);
};

const loadScript: LoadExternal = (path, props = {}) => {
  const script = document.querySelector(`script[src="${path}"]`);

  if (!script) {
    const newScript = document.createElement('script');
    newScript.src = path;

    Object.keys(props).forEach((key) => {
      (newScript as any)[key] = (props as any)[key];
    });

    trackResourceStatus(newScript);
    document.body.appendChild(newScript);

    return {
      ref: newScript,
      status: 'loading',
    };
  }

  return {
    ref: script,
    status: (script.getAttribute('data-status') as Status) || 'ready',
  };
};

const loadCss: LoadExternal = (path, props = {}) => {
  const css = document.querySelector(`link[href="${path}"]`);
  if (!css) {
    const newCss = document.createElement('link');

    newCss.rel = 'stylesheet';
    newCss.href = path;
    Object.keys(props).forEach((key) => {
      (newCss as any)[key] = (props as any)[key];
    });
    // IE9+
    const isLegacyIECss = 'hideFocus' in newCss;
    // use preload in IE Edge (to detect load errors)
    if (isLegacyIECss && newCss.relList) {
      newCss.rel = 'preload';
      newCss.as = 'style';
    }
    trackResourceStatus(newCss);
    document.head.appendChild(newCss);

    return {
      ref: newCss,
      status: 'loading',
    };
  }

  return {
    ref: css,
    status: (css.getAttribute('data-status') as Status) || 'ready',
  };
};

const useExternal = (path?: string, options?: Options) => {
  const [status, setStatus] = useState<Status>(path ? 'loading' : 'unset');

  useEffect(() => {
    if (!path) {
      setStatus('unset');
      return;
    }
    const pathname = path.replace(/[?#].*$/, '');
    let result: LoadResult;
    if (options?.type === 'css' || (!options?.type && /(^css!|\.css$)/.test(pathname))) {
      result = loadCss(path, options?.css);
    } else if (options?.type === 'js' || (!options?.type && /(^js!|\.js$)/.test(pathname))) {
      result = loadScript(path, options?.js);
    } else {
      console.error(
        "Cannot infer the type of external resource, and please provide a type ('js' | 'css'). " +
          'Refer to the https://ahooks.js.org/hooks/dom/use-external/#options',
      );
      return;
    }

    const element = result.ref;
    setStatus(result.status);
    const resource = managedResources.get(element);
    if (resource) {
      resource.users += 1;
    }

    const handler = (event: Event) => {
      const targetStatus = event.type === 'load' ? 'ready' : 'error';
      element.setAttribute('data-status', targetStatus);
      setStatus(targetStatus);
    };

    element.addEventListener('load', handler);
    element.addEventListener('error', handler);
    return () => {
      element.removeEventListener('load', handler);
      element.removeEventListener('error', handler);
      if (resource) {
        resource.users -= 1;
        if (resource.users === 0 && !options?.keepWhenUnused) {
          element.remove();
        }
      }
    };
  }, [path]);

  return status;
};

export default useExternal;
