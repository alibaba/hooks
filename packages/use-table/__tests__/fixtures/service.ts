import { IResponse } from '../../src/type';

const service = (data): Promise<IResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, 500);
  });
};

export default service;
