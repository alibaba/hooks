const path = require('node:path');
const { execSync } = require('node:child_process');

try {
  // 运行构建命令
  execSync('pnpm run build:doc', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DOCS_PUBLIC_PATH: '/hooks/',
    },
  });

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
    execSync('git remote add origin git@github.com:alibaba/hooks.git', {
      stdio: 'inherit',
    });
  } catch {
    // 如果远程仓库已存在，忽略错误
  }

  // 强制推送到 gh-pages 分支
  execSync('git push -f origin HEAD:gh-pages', { stdio: 'inherit' });

  // 返回到项目根目录
  process.chdir(path.join(__dirname, '..'));
} catch (e) {
  process.chdir(path.join(__dirname, '..'));
  throw e;
}
