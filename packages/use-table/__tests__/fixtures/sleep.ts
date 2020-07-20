const sleep = (t) => {
  return new Promise((resolve) => {
    setTimeout(resolve, t * 1000);
  });
};

export default sleep;
