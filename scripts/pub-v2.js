const jsonfile = require('jsonfile');
const semver = require('semver');
const execa = require('execa');
const path = require('path');

const packageJsonFilePathname = path.resolve(`${__dirname}/../packages/hooks/package.json`);
const packageDirname = path.dirname(packageJsonFilePathname);

const jsonObj = jsonfile.readFileSync(packageJsonFilePathname);
const originalName = jsonObj.name;
const targetName = `${originalName}-v2`;

if (originalName !== 'ahooks') {
  throw new Error(`"${originalName}" 包名必须是 "ahooks"！`);
}
if (!semver.valid(jsonObj.version) || semver.gte(jsonObj.version, '3.0.0') || semver.lt(jsonObj.version, '2.0.0')) {
  throw new Error(`"${jsonObj.version}" 版本不是合法的 v2 版本！`);
}
jsonObj.name = targetName;
jsonfile.writeFileSync(packageJsonFilePathname, jsonObj, { spaces: 2, finalEOL: true });

try {
  execa.sync('npm', ['publish'], {
    cwd: packageDirname,
    stdio: 'inherit',
    env: process.env,
  });
} finally {
  jsonObj.name = originalName;
  jsonfile.writeFileSync(packageJsonFilePathname, jsonObj, { spaces: 2, finalEOL: true });
}
