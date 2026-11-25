import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

export interface Options {
  onFiles?: (files: File[], event?: React.DragEvent) => void;
  onUri?: (url: string, event?: React.DragEvent) => void;
  onDom?: (content: any, event?: React.DragEvent) => void;
  onText?: (text: string, event?: React.ClipboardEvent) => void;
  onDragEnter?: (event?: React.DragEvent) => void;
  onDragOver?: (event?: React.DragEvent) => void;
  onDragLeave?: (event?: React.DragEvent) => void;
  onDrop?: (event?: React.DragEvent) => void;
  onPaste?: (event?: React.ClipboardEvent) => void;
}

const useDrop = (target: BasicTarget, options: Options = {}) => {
  const optionsRef = useLatest(options);

  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(target);
      if (!targetElement?.addEventListener) {
        return;
      }
      const enteredTargets = new Set<Node>();
      const ownerDocument = targetElement.ownerDocument ?? document;

      const removeDetachedTargets = () => {
        for (const entered of enteredTargets) {
          if (entered !== targetElement && !targetElement.contains(entered)) {
            enteredTargets.delete(entered);
          }
        }
      };

      const resetEnteredTargets = () => enteredTargets.clear();

      const onData = (
        dataTransfer: DataTransfer,
        event: React.DragEvent | React.ClipboardEvent,
      ) => {
        const uri = dataTransfer.getData('text/uri-list');
        const dom = dataTransfer.getData('custom');

        if (dom && optionsRef.current.onDom) {
          let data = dom;
          try {
            data = JSON.parse(dom);
          } catch {
            data = dom;
          }
          optionsRef.current.onDom(data, event as React.DragEvent);
          return;
        }

        if (uri && optionsRef.current.onUri) {
          optionsRef.current.onUri(uri, event as React.DragEvent);
          return;
        }

        if (dataTransfer.files && dataTransfer.files.length && optionsRef.current.onFiles) {
          optionsRef.current.onFiles(Array.from(dataTransfer.files), event as React.DragEvent);
          return;
        }

        if (dataTransfer.items && dataTransfer.items.length && optionsRef.current.onText) {
          const strings = Array.from(dataTransfer.items).filter((item) => item.kind === 'string');
          const item = strings.find((entry) => entry.type === 'text/plain') ?? strings[0];
          item?.getAsString((text) => {
            optionsRef.current.onText?.(text, event as React.ClipboardEvent);
          });
        }
      };

      const onDragEnter = (event: React.DragEvent) => {
        event.preventDefault();
        const alreadyInside = enteredTargets.size > 0;
        enteredTargets.add((event.target as Node) || targetElement);
        removeDetachedTargets();
        if (!alreadyInside) {
          optionsRef.current.onDragEnter?.(event);
        }
      };

      const onDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        optionsRef.current.onDragOver?.(event);
      };

      const onDragLeave = (event: React.DragEvent) => {
        if (!enteredTargets.delete((event.target as Node) || targetElement)) {
          return;
        }
        removeDetachedTargets();
        if (enteredTargets.size === 0) {
          optionsRef.current.onDragLeave?.(event);
        }
      };

      const onDrop = (event: React.DragEvent) => {
        event.preventDefault();
        resetEnteredTargets();
        onData(event.dataTransfer, event);
        optionsRef.current.onDrop?.(event);
      };

      const onPaste = (event: React.ClipboardEvent) => {
        onData(event.clipboardData, event);
        optionsRef.current.onPaste?.(event);
      };

      targetElement.addEventListener('dragenter', onDragEnter as any);
      targetElement.addEventListener('dragover', onDragOver as any);
      targetElement.addEventListener('dragleave', onDragLeave as any);
      targetElement.addEventListener('drop', onDrop as any);
      targetElement.addEventListener('paste', onPaste as any);
      // Reset enclosing targets even when a nested drop handler stops bubbling.
      ownerDocument.addEventListener('drop', resetEnteredTargets, true);

      return () => {
        targetElement.removeEventListener('dragenter', onDragEnter as any);
        targetElement.removeEventListener('dragover', onDragOver as any);
        targetElement.removeEventListener('dragleave', onDragLeave as any);
        targetElement.removeEventListener('drop', onDrop as any);
        targetElement.removeEventListener('paste', onPaste as any);
        ownerDocument.removeEventListener('drop', resetEnteredTargets, true);
      };
    },
    [],
    target,
  );
};

export default useDrop;
