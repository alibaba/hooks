export type cachedKeyType = string | number;

const cache: { [key in cachedKeyType ]: { data: any, timer: ReturnType<typeof setTimeout> } } = {};

const setCache = (key: cachedKeyType, data: any) => {
  if (cache[key]) {
    clearTimeout(cache[key].timer);
  }

  // 数据在不活跃 5min 后，删除掉
  const timer = setTimeout(() => {
    delete cache[key];
  }, 5 * 60 * 1000);

  cache[key] = {
    data,
    timer
  };
};

const getCache = (key: cachedKeyType) => cache[key]?.data


export {
  getCache,
  setCache
};
