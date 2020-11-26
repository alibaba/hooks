type getDragPropsFn = (
  data: any,
) => {
  draggable: 'true';
  key: string;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
};

interface IConfig {
  onDragStart?: (data: any, e: React.DragEvent) => void;
  onDragEnd?: (data: any, e: React.DragEvent) => void;
}

const useDrag = (config?: IConfig): getDragPropsFn => {
  const getProps = (data: any) => {
    return {
      key: JSON.stringify(data),
      draggable: 'true' as const,
      onDragStart: (e: React.DragEvent) => {
        if (config && config.onDragStart) {
          config.onDragStart(data, e);
        }
        e.dataTransfer.setData('custom', JSON.stringify(data));
      },
      onDragEnd: (e: React.DragEvent) => {
        if (config && config.onDragEnd) {
          config.onDragEnd(data, e);
        }
      },
    };
  };

  return getProps;
};

export default useDrag;
