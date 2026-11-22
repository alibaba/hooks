// @vitest-environment node
import { renderToString } from 'react-dom/server';
import { describe, expect, test } from 'vitest';
import useScrollLock from '../index';

function Probe() {
  const [locked, actions] = useScrollLock({ defaultLocked: true });
  return <span>{`${locked}:${typeof actions.lock}`}</span>;
}

describe('useScrollLock on the server', () => {
  test('renders the requested state without touching the DOM', () => {
    expect(renderToString(<Probe />)).toBe('<span>true:function</span>');
  });
});
