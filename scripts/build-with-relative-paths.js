const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const configPath = path.join(__dirname, '../config/config.ts');
const backupPath = path.join(__dirname, '../config/config.ts.backup');

// 备份原配置
fs.copyFileSync(configPath, backupPath);

try {
  // 读取配置文件
  let config = fs.readFileSync(configPath, 'utf8');

  // 修改配置
  config = config.replace(/publicPath: ['"].*['"],/, "publicPath: '/hooks/',");
  config = config.replace(
    /{ rel: 'stylesheet', href: '\/style\.css' }/,
    "{ rel: 'stylesheet', href: '/hooks/style.css' }",
  );
  config = config.replace(/logo: '\/logo\.svg',/, "logo: '/hooks/logo.svg',");

  // 写入修改后的配置
  fs.writeFileSync(configPath, config);

  // 运行构建命令
  execSync('pnpm run build:doc', { stdio: 'inherit' });

  // 进入 dist 目录
  process.chdir(path.join(__dirname, '../dist'));

  // 初始化 git 仓库（如果不存在）
  try {
    execSync('git init', { stdio: 'inherit' });
  } catch (e) {
    // 如果已经初始化过，忽略错误
  }

  // 添加所有文件
  execSync('git add .', { stdio: 'inherit' });

  // 提交更改
  execSync('git commit -m "chore: update gh-pages"', { stdio: 'inherit' });

  // 添加远程仓库（如果不存在）
  try {
    execSync('git remote add origin git@github.com:alibaba/hooks.git', { stdio: 'inherit' });
  } catch (e) {
    // 如果远程仓库已存在，忽略错误
  }

  // 强制推送到 gh-pages 分支
  execSync('git push -f origin HEAD:gh-pages', { stdio: 'inherit' });

  // 返回到项目根目录
  process.chdir(path.join(__dirname, '..'));
} finally {
  // 恢复原配置
  fs.copyFileSync(backupPath, configPath);
  fs.unlinkSync(backupPath);
}
