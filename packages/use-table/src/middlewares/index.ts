import lazyMiddleware from './lazy';
import paramsMiddleware from './params';
import fetchMiddleware from './fetch';
import renderMiddleware from './render';

export default {
  didRender: [lazyMiddleware, renderMiddleware],
  willQuery: [paramsMiddleware],
  querying: [fetchMiddleware],
};
