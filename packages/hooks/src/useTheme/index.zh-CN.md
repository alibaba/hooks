---
nav:
  path: /hooks
---

# useTheme

获取并设置当前主题，并将 `themeMode` 存储在 `localStorage` 中。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const { theme, themeMode, setThemeMode } = useTheme({
  localStorageKey?: string;
});
```

### 参数

| 参数            | 说明                                 | 类型     | 默认值    |
| --------------- | ------------------------------------ | -------- | --------- |
| localStorageKey | localStorage 中用于存放主题模式的键 | `string` | `undefined` |

### 返回值

| 值           | 说明           | 类型                                            | 默认值                                                                 |
| ------------ | -------------- | ----------------------------------------------- | ---------------------------------------------------------------------- |
| theme        | 当前显示的主题 | `"light"   \| "dark"`                           | 若 themeMode 为 "system" 则为系统当前使用主题，否则与 themeMode 值相同 |
| themeMode    | 选择的主题模式 | `"light" \| "dark" \| "system"`                 | 等于 localStorage "themeMode" 字段的值，否则为 "system"                |
| setThemeMode | 选择主题模式   | `(mode: "light" \| "dark" \| "system") => void` |                                                                        |
