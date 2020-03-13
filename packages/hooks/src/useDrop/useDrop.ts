import { useMemo, useState } from 'react';

export interface DropAreaState {
  isOver: boolean;
}

export interface DropProps {
  onDragOver: React.DragEventHandler;
  onDragEnter: React.DragEventHandler;
  onDragLeave: React.DragEventHandler;
  onDrop: React.DragEventHandler;
  onPaste: React.ClipboardEventHandler;
}

export interface DropAreaOptions {
  onFiles?: (files: File[], event?: React.DragEvent) => void;
  onUri?: (url: string, event?: React.DragEvent) => void;
  onDom?: (content: any, event?: React.DragEvent) => void;
  onText?: (text: string, event?: React.ClipboardEvent) => void;
}

const getCallback = (options: DropAreaOptions) => (dataTransfer: DataTransfer, event: (React.DragEvent | React.ClipboardEvent)) => {
  const uri = dataTransfer.getData('text/uri-list');
  const dom = dataTransfer.getData('custom');

  if(dom && options.onDom) {
    options.onDom(JSON.parse(dom), event as React.DragEvent);
    return;
  }

  if (uri && options.onUri) {
    options.onUri(uri, event as React.DragEvent);
    return;
  }

  if (dataTransfer.files && dataTransfer.files.length && options.onFiles) {
    options.onFiles([...dataTransfer.files], event as React.DragEvent);
    return;
  }

  if (dataTransfer.items && dataTransfer.items.length && options.onText) {
    dataTransfer.items[0].getAsString(text => {
      options.onText!(text, event as React.ClipboardEvent);
    });
  }
};

const getProps = (
  callback: (dataTransfer: DataTransfer, event: (React.DragEvent | React.ClipboardEvent)) => void, 
  setIsOver: (over: boolean) => void,
): DropProps => ({
  onDragOver: (event: React.DragEvent) => {
    event.preventDefault();
  },
  onDragEnter: (event: React.DragEvent) => {
    event.preventDefault();
    setIsOver(true);
  },
  onDragLeave: () => {
    setIsOver(false);
  },
  onDrop: (event: React.DragEvent) => {
    event.preventDefault();
    event.persist();
    setIsOver(false);
    callback(event.dataTransfer, event);
  },
  onPaste: (event: React.ClipboardEvent) => {
    event.persist();
    callback(event.clipboardData, event);
  },
});

const useDrop = (options: DropAreaOptions = {}): [DropProps, DropAreaState] => {
  const { onFiles, onText, onUri } = options;
  const [isOver, setIsOver] = useState<boolean>(false);
  const callback = useMemo(() => getCallback(options), [onFiles, onText, onUri]);
  const props: DropProps = useMemo(() => getProps(callback, setIsOver), [callback, setIsOver]);

  return [props, { isOver }];
};

export default useDrop;