import { cleanup, fireEvent, renderHook } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import useDrop, { type Options } from '..';

afterEach(cleanup);

const stringItem = (type: string, text: string) => ({
  kind: 'string',
  type,
  getAsString: (read: (value: string) => void) => read(text),
});

test.each(['hello', ''])('prefers the plain text representation of a rich paste (%j)', (text) => {
  const target = document.createElement('div');
  const onText = vi.fn();
  renderHook(() => useDrop(target, { onText }));

  fireEvent.paste(target, {
    clipboardData: {
      getData: () => '',
      items: [stringItem('text/html', '<b>hello</b>'), stringItem('text/plain', text)],
    },
  });

  expect(onText).toHaveBeenCalledWith(text, expect.objectContaining({ type: 'paste' }));
});

test('can read a caption after a file and still gives an onFiles handler precedence', () => {
  const target = document.createElement('div');
  const onText = vi.fn();
  const onFiles = vi.fn();
  const { rerender } = renderHook<void, Options>((options) => useDrop(target, options), {
    initialProps: { onText },
  });
  const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
  const fileItem = { kind: 'file', type: file.type, getAsString: vi.fn() };
  const dataTransfer = {
    getData: () => '',
    files: [file],
    items: [fileItem, stringItem('text/html', '<b>caption</b>')],
  };

  fireEvent.drop(target, { dataTransfer });
  expect(onText).toHaveBeenCalledWith('<b>caption</b>', expect.objectContaining({ type: 'drop' }));
  fireEvent.drop(target, { dataTransfer: { ...dataTransfer, items: [fileItem] } });
  expect(onText).toHaveBeenCalledTimes(1);

  rerender({ onText, onFiles });
  fireEvent.drop(target, { dataTransfer });
  expect(onFiles).toHaveBeenCalledWith([file], expect.objectContaining({ type: 'drop' }));
  expect(onText).toHaveBeenCalledTimes(1);
});

test('can remove onText before the browser delivers the string', () => {
  const target = document.createElement('div');
  const onText = vi.fn();
  const { rerender } = renderHook<void, Options>((options) => useDrop(target, options), {
    initialProps: { onText },
  });
  const getAsString = vi.fn<(read: (value: string) => void) => void>();
  fireEvent.paste(target, {
    clipboardData: {
      getData: () => '',
      items: [{ kind: 'string', type: 'text/plain', getAsString }],
    },
  });

  rerender({});
  const [deliver] = getAsString.mock.calls[0];
  deliver('hello');
  expect(onText).not.toHaveBeenCalled();
});
