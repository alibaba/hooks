type getDragPropsFn = (data: any) => {
  draggable: 'true',
  key: string,
  onDragStart: (e: React.DragEvent) => void;
}

const useDrag = (): getDragPropsFn => {
  const getProps = (data: any) => {
    return {
      key: JSON.stringify(data),
      draggable: 'true' as const,
      onDragStart: (e: React.DragEvent) => {
        e.dataTransfer.setData('custom', JSON.stringify(data));
      }
    }
  }

  return getProps;
};

export default useDrag;