// @vitest-environment node
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import useNetwork from '../index';

const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

beforeEach(() => {
  // Node 21+ defines a global `navigator`; the Node 20 row in CI does not.
  // Delete it so both matrices exercise the same SSR environment.
  delete (globalThis as { navigator?: unknown }).navigator;
});

afterEach(() => {
  if (navigatorDescriptor) {
    Object.defineProperty(globalThis, 'navigator', navigatorDescriptor);
  }
});

function App() {
  const network = useNetwork();
  return <span>{network.online === undefined ? 'unknown' : String(network.online)}</span>;
}

describe('useNetwork on the server', () => {
  test('renders without a navigator global', () => {
    expect(renderToString(<App />)).toBe('<span>unknown</span>');
  });
});
