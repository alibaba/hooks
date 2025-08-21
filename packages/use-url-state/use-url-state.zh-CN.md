---
nav:
  path: /hooks
group:
  path: /
---

# useUrlState

通过 url query 来管理 state 的 Hook。

## 安装

```bash
npm i @ahooksjs/use-url-state -S
```

> 该 Hooks 基于 `react-router` 的 useLocation & useHistory & useNavigate 进行 query 管理，所以使用该 Hooks 之前，你需要保证
>
> 1\. 你项目正在使用 `react-router` 5.x 或 6.x 版本来管理路由
>
> 2\. 独立安装了 @ahooksjs/use-url-state

## 使用

```js
import useUrlState from '@ahooksjs/use-url-state';
```

## 代码演示

### 在线演示

React Router V5: https://codesandbox.io/s/suspicious-feather-cz4e0?file=/App.tsx

React Router V6: https://codesandbox.io/s/autumn-shape-odrt9?file=/App.tsx

### 基础用法

<code src="./demo/demo1.tsx" hideActions='["CSB"]' />

### 多状态管理

<code src="./demo/demo2.tsx" hideActions='["CSB"]' />

### 多状态管理（拆分）

<code src="./demo/demo4.tsx" hideActions='["CSB"]' />

### 自定义 query-string 配置

<code src="./demo/demo3.tsx" hideActions='["CSB"]' />

## API

```typescript
const [state, setState] = useUrlState(baseState, options);
```

### Params

| 参数      | 说明                                                           | 类型           | 默认值 |
| --------- | -------------------------------------------------------------- | -------------- | ------ |
| baseState | 基准状态，URL 查询参数会在此基础上进行合并 | `S \| () => S` | -      |
| options   | url 配置                                                       | `Options`      | -      |

### Options

| 参数             | 说明                                                                                                    | 类型                  | 默认值   |
| ---------------- | ------------------------------------------------------------------------------------------------------- | --------------------- | -------- |
| navigateMode     | 状态变更时切换 history 的方式                                                                           | `'push' \| 'replace'` | `'push'` |
| parseOptions     | `query-string` [parse](https://github.com/sindresorhus/query-string#parsestring-options) 的配置         | `ParseOptions`        | -        |
| stringifyOptions | `query-string` [stringify](https://github.com/sindresorhus/query-string#stringifyobject-options) 的配置 | `StringifyOptions`    | -        |

### Result

| 参数     | 说明                                    | 类型                                              |
| -------- | --------------------------------------- | ------------------------------------------------- |
| state    | url query 对象                          | `object`                                          |
| setState | 用法同 useState，但 state 需要是 object | `(state: S) => void \| (() => ((state: S) => S))` |
