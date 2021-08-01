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
  /**
   * 是否在 getProps 方法返回的对象中包含默认的 key
   *
   * @default true
   */
  getPropsWithKey?: boolean;
}

const useDrag = <T = any>(options?: Options<T>): getDragPropsFn => {
  const getProps = (data: T) => {
    return {
      key: options?.getPropsWithKey === false ? undefined : JSON.stringify(data),
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
