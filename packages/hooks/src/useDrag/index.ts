import useMemoizedFn from '../useMemoizedFn';

type getDragPropsFn = (data: any) => {
  draggable: 'true';
  key?: string;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
};

interface Options<T> {
  onDragStart?: (data: T, e: React.DragEvent) => void;
  onDragEnd?: (data: T, e: React.DragEvent) => void;
}

const useDrag = <T = any>(options?: Options<T>): getDragPropsFn => {
  const getProps = (data: T) => {
    return {
      draggable: 'true' as const,
      onDragStart: (e: React.DragEvent) => {
        options?.onDragStart?.(data, e);
        e.dataTransfer.setData('custom', JSON.stringify(data));
      },
      onDragEnd: (e: React.DragEvent) => {
        options?.onDragEnd?.(data, e);
      },
    };
  };

  return useMemoizedFn(getProps);
};

export default useDrag;
