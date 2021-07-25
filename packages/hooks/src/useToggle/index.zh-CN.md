---
title: useToggle
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useToggle

<Tag lang="zh-CN" tags="ssr&crossPlatform"></Tag>

用于在两个状态值间切换的 Hook。

## Examples

### 基础用法

<code src="./demo/demo1.tsx" />

### 高级用法

<code src="./demo/demo2.tsx" />

## API

```typescript
const [state, { toggle, set, setLeft, setRight }] = useToggle(
  defaultValue?: boolean,
);

const [state, { toggle, set, setLeft, setRight }] = useToggle(
  defaultValue: any,
  reverseValue: any,
);
```

### Params

| 参数         | 说明                     | 类型  | 默认值  |
|--------------|--------------------------|-------|---------|
| defaultValue | 可选项，传入默认的状态值 | `any` | `false` |
| reverseValue | 可选项，传入取反的状态值 | `any` | -       |

### Result

| 参数    | 说明     | 类型      |
|---------|----------|-----------|
| state   | 状态值   | -         |
| actions | 操作集合 | `Actions` |

### Actions

| 参数     | 说明                | 类型                    |
|----------|---------------------|-------------------------|
| toggle   | 切换 state          | `() => void`            |
| set      | 修改 state          | `(state: any) => void` |
| setLeft  | 设置为 defaultValue | `() => void`            |
| setRight | 设置为 reverseValue | `() => void`            |
