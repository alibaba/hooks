import debounce from 'lodash/debounce';

function isNodeOrWeb() {
  const freeGlobal =
    (typeof global === 'undefined' ? 'undefined' : typeof global) == 'object' &&
    global &&
    global.Object === Object &&
    global;
  const freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  return freeGlobal || freeSelf;
}

if (!isNodeOrWeb()) {
  global.Date = Date;
}

export { debounce };
