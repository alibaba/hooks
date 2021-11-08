---
nav:
  path: /hooks
---

# useHistoryTravel

管理状态历史变化记录，方便在历史记录中前进与后退。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 可撤销恢复的 Todo List

<code src="./demo/demo2.tsx" />

## API

```typescript
const { 
  value, 
  setValue, 
  backLength, 
  forwardLength,
  go, 
  back, 
  forward 
} = useHistoryTravel<T>(initialValue?: T);
```

### Params

| 参数         | 说明         | 类型  | 默认值 |
|--------------|--------------|-------|--------|
| initialValue | 可选，初始值 | `any` | -      |


### Result

| 参数          | 说明                                          | 类型                            |
|---------------|-----------------------------------------------|---------------------------------|
| value         | 当前值                                        | `T`                             |
| setValue      | 设置 value                                    | `(value: T) => void`            |
| backLength    | 可回退历史长度                                | `number`                        |
| forwardLength | 可前进历史长度                                | `number`                        |
| go            | 前进步数, step < 0 为后退， step > 0 时为前进 | `(step: number) => void`        |
| back          | 向后回退一步                                  | `() => void`                    |
| foward        | 向前前进一步                                  | `() => void`                    |
| reset         | 重置到初始值，或提供一个新的初始值            | `(newInitialValue?: T) => void` |
