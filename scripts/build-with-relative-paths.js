const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const enDocPath = path.join(__dirname, '../docs/index.en-US.md');
const enDocBakPath = path.join(__dirname, '../docs/index.en-US.md.bak');
const zhDocPath = path.join(__dirname, '../docs/index.zh-CN.md');
const zhDocBakPath = path.join(__dirname, '../docs/index.zh-CN.md.bak');

// 备份原配置
fs.copyFileSync(enDocPath, enDocBakPath);
fs.copyFileSync(zhDocPath, zhDocBakPath);

try {
  // 读取配置文件
  let enDoc = fs.readFileSync(enDocPath, 'utf8');
  let zhDoc = fs.readFileSync(zhDocPath, 'utf8');

  // 修改配置
  enDoc = enDoc.replace('image: /logo.svg', 'image: /hooks/logo.svg');
  zhDoc = zhDoc.replace('image: /logo.svg', 'image: /hooks/logo.svg');

  // 写入修改后的配置
  fs.writeFileSync(enDocPath, enDoc);
  fs.writeFileSync(zhDocPath, zhDoc);

  execSync('pnpm run build:doc', {
    stdio: 'inherit',
    env: process.env,
  });
} finally {
  // 恢复原配置
  fs.copyFileSync(enDocBakPath, enDocPath);
  fs.copyFileSync(zhDocBakPath, zhDocPath);
  fs.unlinkSync(enDocBakPath);
  fs.unlinkSync(zhDocBakPath);
}
