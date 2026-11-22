// @vitest-environment node
import { renderToString } from 'react-dom/server';
import { describe, expect, test } from 'vitest';
import useIdle from '../index';

function Probe({ initialState }: { initialState: boolean }) {
  return <span>{String(useIdle(1000, { initialState }))}</span>;
}

describe('useIdle on the server', () => {
  test('returns initialState without touching the DOM', () => {
    expect(renderToString(<Probe initialState={true} />)).toBe('<span>true</span>');
    expect(renderToString(<Probe initialState={false} />)).toBe('<span>false</span>');
  });
});
