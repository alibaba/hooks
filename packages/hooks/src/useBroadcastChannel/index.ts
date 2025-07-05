import { useEffect, useRef } from 'react';

interface BroadcastChannelOptions<T> {
  onMessage?: (message: T) => void;
  onMessageError?: (event: MessageEvent) => void;
}

export function useBroadcastChannel<T>(
  channelName: string,
  options: BroadcastChannelOptions<T> = {}
) {
  const channel = new BroadcastChannel(channelName);
  const channelRef = useRef(channel);
  const currentChannel = channelRef.current;

  const sendMessage = (data: T) => currentChannel.postMessage(data);

  useEffect(() => {
    currentChannel.onmessage = event => options.onMessage?.(event.data);
    currentChannel.onmessageerror = event => options.onMessageError?.(event);
  }, [channelName, currentChannel, options]);

  return {
    sendMessage,
  };
}
