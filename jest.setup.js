// mock screen full events
// https://github.com/sindresorhus/screenfull/blob/main/index.js
const screenfullMethods = [
  'requestFullscreen',
  'exitFullscreen',
  'fullscreenElement',
  'fullscreenEnabled',
  'fullscreenchange',
  'fullscreenerror',
];
screenfullMethods.forEach((item) => {
  document[item] = () => {};
  HTMLElement.prototype[item] = () => {};
});
