import { isUndef } from './index';

const isBrowser = !!(!isUndef(window) && window.document && window.document.createElement);

export default isBrowser;
