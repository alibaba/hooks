const path = require('path');
const fse = require('fs-extra');
const decamelize = require('decamelize');
const spawn = require('cross-spawn');
const gulpCLI = require.resolve('gulp/bin/gulp.js');
const webpackCLI = require.resolve('webpack-cli/bin/cli.js');

const packagesDir = path.join(__dirname, 'packages');
const packages = fse.readdirSync(packagesDir);

for (const packageName of packages) {
  const packageDir = path.join(packagesDir, packageName);
  spawn.sync(gulpCLI, ['--config', 'gulpfile.js'], {
    stdio: 'inherit',
    cwd: packageDir,
  });

  spawn.sync('webpackCLI', ['--config', 'webpack.config.js'], {
    stdio: 'inherit',
    env: {
      filename: `ahooks-${decamelize(packageName, '-')}.js`,
      library: `ahooks${capitalizeFirstLetter(packageName)}`,
    },
  });
}

function capitalizeFirstLetter(str) {
  return str.replace(/^\S/, (s) => s.toUpperCase());
}
