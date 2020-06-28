export type cachedKeyType = string | number;

const cache: {
  [key in cachedKeyType]: { data: any; timer: ReturnType<typeof setTimeout>; startTime: number };
} = {};

const setCache = (key: cachedKeyType, cacheTime: number, data: any) => {
  if (cache[key]?.timer) {
    clearTimeout(cache[key].timer);
  }

  let timer: ReturnType<typeof setTimeout>;

  if (cacheTime > -1) {
    // 数据在不活跃 cacheTime 后，删除掉
    timer = setTimeout(() => {
      delete cache[key];
    }, cacheTime);
  }

  cache[key] = {
    data,
    timer,
    startTime: new Date().getTime(),
  };
};

const getCache = (key: cachedKeyType) => ({
  data: cache[key]?.data,
  startTime: cache[key]?.startTime,
});

export { getCache, setCache };
