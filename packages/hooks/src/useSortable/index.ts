import React, { useState, useCallback, useRef } from 'react';

interface SortableProps<T> {
  initialValue: T[];
  onSort?: (oldIndex: number, newIndex: number, oldList: T[], newList: T[]) => void;
}

export default <T>(props: SortableProps<T>) => {
  const initialValue = props.initialValue.map(ele => ({ type: 'item', content: ele }));
  const lastSorted = useRef(initialValue);
  const dummyIndex = useRef<null | number>(null);
  const previewRef = useRef<any>(null);
  const draggingNodeRef = useRef<any>(null);
  const draggingIndexRef = useRef<null | number>(null);
  const onSortRef = useRef(props.onSort);
  onSortRef.current = props.onSort;

  const [ list, setList ] = useState(initialValue);
  const [dragging, setDragging] = useState<number | null>(null);

  const getSortProps = useCallback((index: number)=>{
    return {
      draggable: 'true' as const,
      key: JSON.stringify(list[index]),
      onDragStart: (e: React.DragEvent) => {
        e.persist();
        draggingNodeRef.current = e.target;
        previewRef.current = (e.target as any).cloneNode(true);
        previewRef.current.style.top = 0;
        previewRef.current.style.left = "-100%"
        document.body.appendChild(previewRef.current);
        e.dataTransfer.setDragImage(previewRef.current, 0, 0);
        draggingIndexRef.current = index;
        setTimeout(()=>{
          draggingNodeRef.current.style.display = 'none'
          // 在后面插入一条 dummy placeholder
          setDragging(index)
          setList(
            lastSorted.current.slice(0, index)
            .concat({ type: 'dummy', content: lastSorted.current[index].content})
            .concat(lastSorted.current.slice(index))
          );
        })
        dummyIndex.current = index;
      },
      onDragEnd: () => {
        previewRef.current.style.display = 'none';
        document.body.removeChild(previewRef.current!);
        draggingNodeRef.current.style.display = 'inherit';
        setList(l => {
          let ret = l.map(ele => {
            if(ele.type === 'dummy') {
              return { type: 'item', content: lastSorted.current[draggingIndexRef.current!].content};
            }
            return ele;
          })
          .filter((_, i) => {
            if( i === dragging && dragging === index ) {
              return false;
            }
            else if( i === (dragging! + 1) && dragging !== index) {
              return false;
            }
            return true;
          });
          lastSorted.current = ret;
          if(onSortRef.current){
            setTimeout(()=>{
              onSortRef.current!(
                // oldIndex
                dragging!, 
                // newIndex
                dragging! < dummyIndex.current! ? dummyIndex.current! - 1 : dummyIndex.current!,
                // oldList
                l.filter(ele => ele.type !== 'dummy').map(ele => ele.content),
                // newList
                ret.map(ele => ele.content),
              );
            })
          }
          return ret;
        })
        setDragging(null)
      },
      onDragEnter: () => {
        dummyIndex.current = index;
        if(dummyIndex.current! < dragging!) {
          setList(lastSorted.current.slice(0, index).concat({ type: 'dummy', content: 'dummy' as any as T }).concat(lastSorted.current.slice(index)));
        } else {
          setList(lastSorted.current.slice(0, index).concat({ type: 'dummy', content: 'dummy' as any as T }).concat(lastSorted.current.slice(index)));
        }
      },
    }
  }, [dragging, list])

  return {
    list: list.map((ele, index) => ({ ...ele, props: getSortProps(index)})),
  }
}