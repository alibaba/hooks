const del = require('del');

del.sync(['./{es,lib}/**/__{test,tests}__/**', './{es,lib}/**/demo/**']);
