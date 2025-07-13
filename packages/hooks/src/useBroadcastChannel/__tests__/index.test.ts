import { act, renderHook } from '@testing-library/react';
import useBroadcastChannel from '../index';

// Skip tests if BroadcastChannel is not available (i.e., not running in a browser)
const describeOrSkip =
  typeof BroadcastChannel === 'undefined' ? describe.skip : describe;

describeOrSkip('useBroadcastChannel', () => {
  it('should send and receive messages', () => {
    const channelName = 'test-channel';
    let received: string | null = null;
    const { result: sender } = renderHook(() =>
      useBroadcastChannel<string>(channelName)
    );
    const { result: receiver } = renderHook(() =>
      useBroadcastChannel<string>(channelName, {
        onMessage: msg => {
          received = msg;
        },
      })
    );

    act(() => {
      sender.current.sendMessage('hello');
    });

    expect(received).toBe('hello');
  });

  it('should support multiple messages', () => {
    const channelName = 'multi-message-channel';
    const messages: string[] = [];
    const { result: sender } = renderHook(() =>
      useBroadcastChannel<string>(channelName)
    );
    renderHook(() =>
      useBroadcastChannel<string>(channelName, {
        onMessage: msg => {
          messages.push(msg);
        },
      })
    );

    act(() => {
      sender.current.sendMessage('foo');
      sender.current.sendMessage('bar');
    });

    expect(messages).toEqual(['foo', 'bar']);
  });
});
