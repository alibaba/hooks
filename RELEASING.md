# ahooks 发布指南

本指南覆盖 npm 正式包、Git tag、GitHub Release 和文档站的发布。每次发布都先核对远端状态，再基于同一个提交构建和发布。版本号、登录状态和 CI 结果必须当次查询，不沿用上一次的结论。

## 发布入口和范围

| 内容 | 配置或入口 | 发布方式 |
| --- | --- | --- |
| ahooks | `packages/hooks/package.json` | 单独发布到 npm |
| @ahooks.js/use-url-state | `packages/use-url-state/package.json` | 独立版本，按实际变更决定是否发布 |
| GitHub Release | 仓库 Releases | 发布中英文说明和对应 tag |
| GitHub Pages 文档镜像 | `.github/workflows/static.yml` | master 推送后自动部署 |
| 正式官网 ahooks.js.org | `pnpm run pub:doc` | 构建后通过 Surge 发布 |

文档镜像为 GitHub Pages。Gitee 已停止发布，仓库遗留的 `pub:doc-gitee` 脚本不属于当前发布流程。

根目录的 `pub` 和 `pub:beta` 会遍历 `packages/*`，不要将它们当作只发布 ahooks 的命令。`Publish Any Commit` 工作流发布的是 `pkg.pr.new` 预览包，不代表 npm 正式版已经发布。

## 确定发布基线

先确认当前工作区、远端 master、npm 版本、tag 和 GitHub Release：

```sh
git status --short
git branch --show-current
git fetch origin master --tags
gh api repos/alibaba/hooks/branches/master --jq .commit.sha
npm view ahooks dist-tags version --json --registry=https://registry.npmjs.org
npm view @ahooks.js/use-url-state dist-tags version --json --registry=https://registry.npmjs.org
gh release list --repo alibaba/hooks --limit 10
```

- 不直接从旧功能分支发布。保留已有工作，从最新 master 创建发布分支，默认使用 `codex/` 前缀。
- 分别确认 package.json、npm、tag 和 Release；它们可能不同步，存在 tag 不等于 npm 发布成功。
- 以实际已发布到 npm 的版本为用户变更基线，找到对应 tag 或发布提交，检查到目标提交的完整差异。
- 明确本次发布哪些包、包含哪些功能和修复，以及暂不包含的 PR。不要只收集最近一次批量合并的 PR。
- 兼容性修复通常使用 patch，向下兼容的新功能通常使用 minor。检查目标版本和 tag 是否已存在；不覆盖或移动已有发布 tag。

## 准备版本提交和发布说明

1. 更新待发布包的 `version`，按需更新内部依赖范围和锁文件。没有变更的独立包不必一起升版。
2. 依据完整差异准备中英文 Release Notes，区分新功能、修复、文档和升级注意事项，附对应 PR 链接。沿用 GitHub Release 发布说明的方式，不在仓库新增 release notes 文件。
3. 准备 GitHub Release 草稿或本地说明文件。实际发布时使用最终版本提交创建 tag，避免草稿提前绑定错误提交。
4. 检查版本 diff，确认没有无关依赖升级、构建产物或环境配置混入提交。

## 验证发布产物

使用根目录 `packageManager` 指定的 pnpm 版本和 CI 支持的 Node.js 版本。先检查本机版本，避免全局 pnpm 与仓库要求不一致。安装应遵循现有锁文件：

确保构建脚本内再次调用 `pnpm` 时也能解析到该版本。仅在最外层使用 `corepack pnpm`，而 PATH 仍指向其他版本的全局 pnpm，可能导致嵌套命令失败。

```sh
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm run build
pnpm run tsc
pnpm run test
pnpm run test:strict
```

在 `packages/hooks` 执行 `pnpm pack`，检查生成的 tarball：

- 包名、版本、依赖和导出入口正确，没有源码路径或本机路径泄漏。
- `es/`、`lib/`、类型声明、`dist/`、`metadata.json` 和 README 按 package.json 的 `files` 配置进入包。
- 在独立临时消费项目安装 tarball，验证 CommonJS、ESM 和 TypeScript 类型使用；按本次变更检查 SSR 及 UMD 加载。
- 本次行为变化的回归测试通过。版本提交合并后，再确认该提交的远端 CI；逐个 PR 的绿灯不能替代合并后的验证。

合并发版 PR 后记录最终提交 SHA。npm、tag、Release 和官网均使用这份代码；若后续修改了代码，需要重新验证产物。

## 发布 npm 和 GitHub Release

发布前检查身份和包权限：

```sh
npm whoami --registry=https://registry.npmjs.org
npm access list collaborators ahooks --registry=https://registry.npmjs.org
```

认证失败时通过本机交互式登录或既有 CI 凭据恢复身份；不要将 token、密码或一次性验证码写进聊天、文档或仓库。发布过程中可能需要账号的交互验证。

从干净、已验证且指向最终版本提交的检出目录，仅发布目标包。只发布 ahooks 时使用：

```sh
pnpm --filter ./packages/hooks publish --tag latest
```

如果需要发布 use-url-state，按它自己的版本和依赖先后顺序单独处理。预发布版本使用对应预发布版本号和 dist-tag，不更新 `latest`。

随后执行以下操作：

1. 查询 npm，确认目标版本可安装、`latest` 正确，发布内容与验证过的产物一致。
2. 为最终版本提交创建并推送对应 `v<version>` tag。
3. 使用中英文说明发布 GitHub Release，设置正确的比较基线，并确认正式版或预发布标记。

## 发布文档

### GitHub Pages 文档镜像

master 推送会触发 `.github/workflows/static.yml`，构建并发布到 `gh-pages` 分支。检查这次版本提交对应的工作流和站点：

- 工作流成功，站点地址为 <https://alibaba.github.io/hooks/>。
- 首页版本、中英文页面、静态资源及新增或修改的示例正常。

### 正式官网

GitHub Pages 部署成功不等于 <https://ahooks.js.org/> 已更新。正式官网使用 Surge，确认具备该站点发布权限后，从最终版本代码重新构建并部署：

```sh
DOCS_PUBLIC_PATH=/ pnpm run pub:doc
```

Pages 使用 `/hooks/` 资源路径，官网使用 `/`。不要将 Pages 构建产物直接上传官网；也不要继承 Pages 的 `DOCS_PUBLIC_PATH`。`pub:doc` 会重新构建后调用 `pub:doc-surge`。

发布后检查官网版本号、中英文导航、新功能文档、示例和资源请求；必要时检查缓存是否仍返回旧内容。

## 验收和中断恢复

- [ ] npm 目标版本、dist-tag 和实际安装结果正确。
- [ ] tag 指向最终版本提交，GitHub Release 内容和版本匹配。
- [ ] 最终版本提交的类型检查、构建、普通及 Strict 模式测试通过。
- [ ] GitHub Pages 文档镜像和正式官网都已更新，文档与包版本一致。
- [ ] 留下版本、提交 SHA、Release、CI、站点链接和未完成事项的发布记录。

任何发布操作超时后，先查询远端结果，确认是否已经成功，再决定重试。npm 成功但文档失败时，只重试文档部署；npm 成功但 Release 缺失时，补齐 tag 和 Release。已经发布的 npm 版本不重复发布，已经存在的 tag 不重写。发现已发布代码有问题时，修复后发布新版本。

## 每次发布的记录模板

```text
发布包和版本：
上一正式版及比较基线：
最终提交 SHA：
包含的功能、修复和文档：
明确排除的变更：
产物安装验证与 CI 链接：
npm 版本与 dist-tag 验证：
Git tag 与 GitHub Release 链接：
GitHub Pages 文档镜像与正式官网验收：
未完成事项：
```
