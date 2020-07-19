import { methods } from './config';
import { IContext } from './type';

export const checkQueryFrom = (ctx: IContext) => {
  const { queryFrom } = ctx.meta || {};
  const { isString } = ctx.helper;
  return Object.keys(methods).reduce((acc, key) => {
    const eventName = methods[key] || '';
    if (!isString(eventName)) {
      return acc;
    }

    const name = eventName.replace(/^on/, 'is');
    return {
      ...acc,
      [name]: queryFrom === eventName,
    };
  }, {});
};
