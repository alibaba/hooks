export const isObject = (obj) => ({}.toString.call(obj) === '[object Object]');

export const replace = (data, keyMap) => {
  Object.keys(keyMap).forEach((key) => {
    data[keyMap[key]] = data[key];
    Object.defineProperty(data, key, {
      get: () => data[keyMap[key]],
      set: (value) => {
        data[keyMap[key]] = value;
      },
    });
  });
  return data;
};

/**
 * 如果 middlewares 不是对象，而是一个 (ctx, next) => {} 中间件的话，
 * 把他放在 yourTurn 阶段里面（config 文件里面定义的 timelines）
 */
export const addYourMiddlewares = (plugins) => {
  return plugins.map((plugin) => {
    const { middlewares: $middlewares } = plugin;
    if (isObject($middlewares)) {
      return plugin;
    }

    if ($middlewares) {
      return {
        ...plugin,
        middlewares: {
          yourTurn: $middlewares,
        },
      };
    }

    return plugin;
  });
};
