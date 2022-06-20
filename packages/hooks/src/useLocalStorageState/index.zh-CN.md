---
nav:
  path: /hooks
---

# useLocalStorageState

将状态存储在 localStorage 中的 Hook 。

## 代码演示

### 将 state 存储在 localStorage 中

<code src="./demo/demo1.tsx" />

### 存储复杂类型数据

<code src="./demo/demo2.tsx" />

### 自定义序列化和反序列化函数

<code src="./demo/demo3.tsx" />

## API

如果想从 localStorage 中删除这条数据，可以使用 `setState()` 或 `setState(undefined)` 。

```typescript
interface Options<T> {
  defaultValue?: T | (() => T);
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

const [state, setState] = useLocalStorageState<T>(
  key: string,
  options: Options<T>
): [T?, (value?: T | ((previousState: T) => T)) => void]
```

### Options

| 参数         | 说明               | 类型                     | 默认值           |
| ------------ | ------------------ | ------------------------ | ---------------- |
| defaultValue | 默认值             | `any \| (() => any)`     | -                |
| serializer   | 自定义序列化方法   | `(value: any) => string` | `JSON.stringify` |
| deserializer | 自定义反序列化方法 | `(value: string) => any` | `JSON.parse`     |

## 备注

useLocalStorageState 在往 localStorage 写入数据前，会先调用一次 `serializer`，在读取数据之后，会先调用一次 `deserializer`。
