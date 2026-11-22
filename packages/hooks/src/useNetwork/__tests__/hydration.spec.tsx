import { act } from '@testing-library/react';
import type { Root } from 'react-dom/client';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { expect, test, vi } from 'vitest';

test('hydrates the server text and then reports the browser network status', async () => {
  // Load the server copy without a browser global.
  let html: string;
  vi.stubGlobal('window', undefined);
  try {
    const { default: useServerNetwork } = await import('../index');
    function ServerApp() {
      return <span>{String(useServerNetwork().online)}</span>;
    }
    html = renderToString(<ServerApp />);
  } finally {
    vi.unstubAllGlobals();
    vi.resetModules();
  }

  const { default: useClientNetwork } = await import('../index');
  function ClientApp() {
    return <span>{String(useClientNetwork().online)}</span>;
  }

  const online = vi.spyOn(window.navigator, 'onLine', 'get').mockReturnValue(true);
  const container = document.createElement('div');
  container.innerHTML = html;
  const serverElement = container.firstElementChild;
  const onRecoverableError = vi.fn();
  let root: Root | undefined;

  try {
    expect(container.textContent).toBe('undefined');
    await act(async () => {
      root = hydrateRoot(container, <ClientApp />, { onRecoverableError });
    });
    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(container.firstElementChild).toBe(serverElement);
    expect(container.textContent).toBe('true');
  } finally {
    act(() => root?.unmount());
    online.mockRestore();
  }
});
