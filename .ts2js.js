const sylvanas = require("sylvanas");
const glob = require('glob');

const files = glob.sync('./src/**/demo/*.@(tsx)');
sylvanas(files, { action: 'write' });