---
nav:
  path: /hooks
---

# useTheme

This hook is used to get and set the theme, and store the `themeMode` into `localStorage`.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const { theme, themeMode, setThemeMode } = useTheme({
  localStorageKey?: string;
});
```

### Params

| Property        | Description                                           | Type     | Default   |
| --------------- | ----------------------------------------------------- | -------- | --------- |
| localStorageKey | The key in localStorage to store selected theme mode | `string` | `undefined` |

### Result

| Property     | Description           | Type                                            | Default                                                                               |
| ------------ | --------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------- |
| theme        | current display theme | `"light"   \| "dark"`                           | if themeMode is "system" then equals to system setting，otherwise equals to themeMode |
| themeMode    | selected theme mode   | `"light" \| "dark" \| "system"`                 | equals to localStorage "themeMode", otherwise equals to "system"                      |
| setThemeMode | select theme mode     | `(mode: "light" \| "dark" \| "system") => void` |                                                                                       |
