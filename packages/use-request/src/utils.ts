export const sleep = (time) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

export function wrapPromise(promise) {
  let status = 'pending';
  let result;
  const suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    },
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender; // 随便抛回一个 promise 是不行的，必须是请求的 promise
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
}
