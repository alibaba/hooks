import { useCallback, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import isDev from '../utils/isDev';

const useDynamicList = <T>(initialList: T[] = []) => {
  const [state, setState] = useState(() => ({
    list: initialList,
    keys: initialList.map((_, index) => index),
    nextKey: initialList.length,
  }));

  const resetList = useCallback((newList: T[]) => {
    setState((current) => ({
      list: newList,
      keys: newList.map((_, index) => current.nextKey + index),
      nextKey: current.nextKey + newList.length,
    }));
  }, []);

  const insert = useCallback((index: number, item: T) => {
    setState((current) => {
      const list = [...current.list];
      const keys = [...current.keys];
      list.splice(index, 0, item);
      keys.splice(index, 0, current.nextKey);
      return { list, keys, nextKey: current.nextKey + 1 };
    });
  }, []);

  const getKey = useMemoizedFn((index: number) => state.keys[index]);

  const getIndex = useMemoizedFn((key: number) => state.keys.indexOf(key));

  const merge = useCallback((index: number, items: T[]) => {
    setState((current) => {
      const list = [...current.list];
      const keys = [...current.keys];
      list.splice(index, 0, ...items);
      keys.splice(index, 0, ...items.map((_, offset) => current.nextKey + offset));
      return { list, keys, nextKey: current.nextKey + items.length };
    });
  }, []);

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
      const list = current.list.filter((_, index) => index !== oldIndex);
      const keys = current.keys.filter((_, index) => index !== oldIndex);
      list.splice(newIndex, 0, current.list[oldIndex]);
      keys.splice(newIndex, 0, current.keys[oldIndex]);
      return { ...current, list, keys };
    });
  }, []);

  const push = useCallback((item: T) => {
    setState((current) => ({
      list: current.list.concat([item]),
      keys: current.keys.concat(current.nextKey),
      nextKey: current.nextKey + 1,
    }));
  }, []);

  const pop = useCallback(() => {
    setState((current) => ({
      ...current,
      list: current.list.slice(0, -1),
      keys: current.keys.slice(0, -1),
    }));
  }, []);

  const unshift = useCallback((item: T) => {
    setState((current) => ({
      list: [item].concat(current.list),
      keys: [current.nextKey].concat(current.keys),
      nextKey: current.nextKey + 1,
    }));
  }, []);

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
