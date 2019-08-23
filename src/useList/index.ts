import { useState, useRef, useCallback } from 'react';

export default <T>(initialValue: T[]) => {
  const keyMap = useRef(new WeakMap());
  const counterRef = useRef(0);
  // 如果未简单类型生成 key，需要一个常规 obj，目前暂定简单类型无需 key
  // const normalMap = useRef<{[key: string]: any}>({});

  // 内部方法
  const setKey = useCallback((obj: T) => {
    counterRef.current += 1;
    try {
      keyMap.current.set(obj as Record<string, any>, counterRef.current);
    } catch (e) {
      // 基本类型无法设置 key
      // normalMap.current[obj.toString()] = counterRef.current;
    }
  }, []);

  // 内部方法
  const replaceKey = useCallback((prevObj: T, newObj: T) => {
    try {
      const prevKey = keyMap.current.get(prevObj as Record<string, any>);
      keyMap.current.set(newObj as Record<string, any>, prevKey);
    } catch (e) {
      // normalMap.current[newObj.toString()] = normalMap.current[prevObj.toString()];
    }
  }, []);

  const [list, setList] = useState(() => {
    initialValue.forEach(ele => {
      setKey(ele);
    });
    return initialValue || [];
  });

  const insert = (index: number, obj: T) => {
    setList(l => {
      const temp = [...l];
      temp.splice(index, 0, obj);
      setKey(obj);
      return temp;
    });
  };

  const getKey = (index: number) => {
    try {
      const obj = list[index] || {};
      return keyMap.current.get(obj);
    } catch (e) {
      return undefined;
      // return normalMap.current[(list[index]).toString()];
    }
  };

  const merge = (index: number, obj: T[]) => {
    setList(l => {
      const head = l.slice(0, index);
      const tail = l.slice(index);

      obj.forEach(ele => {
        setKey(ele);
      });

      return head.concat(obj).concat(tail);
    });
  };

  const replace = (index: number, obj: T) => {
    setList(l => {
      const temp = [...l];
      replaceKey(temp[index], obj);
      temp[index] = obj;
      return temp;
    });
  };

  const remove = (index: number) => {
    setList(l => {
      const head = l.slice(0, index);
      const tail = l.slice(index + 1);
      return head.concat(tail);
    });
  };

  const move = (oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) {
      return;
    }
    setList(l => {
      const newList = [...l];
      const temp = newList.filter((_: {}, index: number) => index !== oldIndex);
      temp.splice(newIndex, 0, newList[oldIndex]);
      return temp;
    });
  };

  const push = (obj: T) => {
    setList(l => {
      setKey(obj);
      return l.concat([obj]);
    });
  };

  const pop = () => {
    setList(l => l.slice(0, l.length - 1));
  };

  const unshift = (obj: T) => {
    setList(l => {
      setKey(obj);
      return [obj].concat(l);
    });
  };

  const shift = () => {
    setList(l => l.slice(1, l.length - 1));
  };

  return {
    list,
    insert,
    merge,
    replace,
    remove,
    getKey,
    move,
    push,
    pop,
    unshift,
    shift,
  };
};
