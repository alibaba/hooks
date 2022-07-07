import { useState } from 'react';
import useEventListener from '../useEventListener';

export interface ClipboardOptions {
  source?: string;
}

export interface ClipboardReturn {
  isSupport: boolean;
  text: string;
  onCopy: (text?: string) => Promise<void>;
}

export default function useClipboard(options?: ClipboardOptions): ClipboardReturn;
export default function useClipboard(options: ClipboardOptions = {}): ClipboardReturn {
  const [text, setText] = useState('');
  const { source } = options;
  const isSupport = Boolean(navigator && 'clipboard' in navigator);

  function updateText() {
    navigator.clipboard.readText().then((value) => {
      setText(value);
    });
  }

  useEventListener('copy', updateText);
  useEventListener('cut', updateText);
  useEventListener('pause', updateText);

  const onCopy = async (value = source) => {
    if (isSupport && typeof value !== 'undefined') {
      await navigator.clipboard.writeText(text);
      setText(value);
    }
  };

  return {
    isSupport,
    text,
    onCopy,
  };
}
