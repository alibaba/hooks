const service = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, 500);
  });
};

export default service;
