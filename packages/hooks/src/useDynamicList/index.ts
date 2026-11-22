import { useCallback, useRef, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import isDev from '../utils/isDev';

const createKeys = (length: number, firstKey: number) =>
  Array.from({ length }, (_, index) => firstKey + index);

const useDynamicList = <T>(initialList: T[] = []) => {
  const nextKeyRef = useRef(initialList.length);
  const [state, setState] = useState(() => ({
    list: initialList,
    keys: createKeys(initialList.length, 0),
  }));

  // Reserve keys when an action is called so replaying its update preserves row identity.
  const reserveKeys = useCallback((count: number) => {
    const firstKey = nextKeyRef.current;
    nextKeyRef.current += count;
    return firstKey;
  }, []);

  const resetList = useCallback(
    (newList: T[]) => {
      const keys = createKeys(newList.length, reserveKeys(newList.length));
      setState({ list: newList, keys });
    },
    [reserveKeys],
  );

  const insert = useCallback(
    (index: number, item: T) => {
      const key = reserveKeys(1);
      setState((current) => {
        const list = [...current.list];
        const keys = [...current.keys];
        list.splice(index, 0, item);
        keys.splice(index, 0, key);
        return { list, keys };
      });
    },
    [reserveKeys],
  );

  const getKey = useMemoizedFn((index: number) => state.keys[index]);

  const getIndex = useMemoizedFn((key: number) => state.keys.indexOf(key));

  const merge = useCallback(
    (index: number, items: T[]) => {
      const insertedItems = [...items];
      const insertedKeys = createKeys(insertedItems.length, reserveKeys(insertedItems.length));
      setState((current) => {
        const list = [...current.list];
        const keys = [...current.keys];
        list.splice(index, 0, ...insertedItems);
        keys.splice(index, 0, ...insertedKeys);
        return { list, keys };
      });
    },
    [reserveKeys],
  );

  const replace = useCallback((index: number, item: T) => {
    setState((current) => {
      const list = [...current.list];
      list[index] = item;
      return { ...current, list };
    });
  }, []);

  const remove = useCallback((index: number) => {
    setState((current) => {
      const list = [...current.list];
      const keys = [...current.keys];
      list.splice(index, 1);
      keys.splice(index, 1);
      return { ...current, list, keys };
    });
  }, []);

  const batchRemove = useCallback((indexes: number[]) => {
    if (!Array.isArray(indexes)) {
      if (isDev) {
        console.error(
          `\`indexes\` parameter of \`batchRemove\` function expected to be an array, but got "${typeof indexes}".`,
        );
      }
      return;
    }
    if (!indexes.length) {
      return;
    }

    setState((current) => {
      const keys: number[] = [];
      const list = current.list.filter((_, index) => {
        if (indexes.includes(index)) {
          return false;
        }
        keys.push(current.keys[index]);
        return true;
      });
      return { ...current, list, keys };
    });
  }, []);

  const move = useCallback((oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) {
      return;
    }
    setState((current) => {
      const list = [...current.list].filter((_, index) => index !== oldIndex);
      const keys = current.keys.filter((_, index) => index !== oldIndex);
      list.splice(newIndex, 0, current.list[oldIndex]);
      keys.splice(newIndex, 0, current.keys[oldIndex]);
      return { ...current, list, keys };
    });
  }, []);

  const push = useCallback(
    (item: T) => {
      const key = reserveKeys(1);
      setState((current) => ({
        list: current.list.concat([item]),
        keys: current.keys.concat(key),
      }));
    },
    [reserveKeys],
  );

  const pop = useCallback(() => {
    setState((current) => ({
      ...current,
      list: current.list.slice(0, -1),
      keys: current.keys.slice(0, -1),
    }));
  }, []);

  const unshift = useCallback(
    (item: T) => {
      const key = reserveKeys(1);
      setState((current) => ({
        list: [item].concat(current.list),
        keys: [key].concat(current.keys),
      }));
    },
    [reserveKeys],
  );

  const shift = useCallback(() => {
    setState((current) => ({
      ...current,
      list: current.list.slice(1),
      keys: current.keys.slice(1),
    }));
  }, []);

  const sortList = useCallback(
    (result: T[]) =>
      result
        .map((item, index) => ({ key: index, item })) // add index into obj
        .sort((a, b) => getIndex(a.key) - getIndex(b.key)) // sort based on the index of table
        .filter((item) => item.item !== undefined && item.item !== null)
        .map((item) => item.item), // retrive the data
    [getIndex],
  );

  return {
    list: state.list,
    insert,
    merge,
    replace,
    remove,
    batchRemove,
    getKey,
    getIndex,
    move,
    push,
    pop,
    unshift,
    shift,
    sortList,
    resetList,
  };
};

export default useDynamicList;
