const del = require('del');

del.sync(['./packages/*/{es,lib,dist}']);
