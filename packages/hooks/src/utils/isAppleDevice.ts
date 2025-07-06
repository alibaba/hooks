const isAppleDevice = /(mac|iphone|ipod|ipad)/i.test(
  typeof navigator !== 'undefined' ? navigator?.platform : '',
);

export default isAppleDevice;
