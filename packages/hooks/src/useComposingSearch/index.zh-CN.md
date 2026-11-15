---
nav:
  path: /hooks
---

# useComposingSearch

感知输入法组词状态的防抖搜索：组词过程中的拼音不会触发搜索，只搜索用户真正上屏的文字。

中文、日文、韩文输入法在组词阶段会把每个按键都送进 `onChange`（例如
`zhong`、`zhongg`、`zhongguo`）。普通防抖会为这些拼音片段发起请求；这个
Hook 会把它们暂存下来，等到组词结束再搜索上屏的文本。

## 代码演示

### 组词感知搜索

<code src="./demo/demo1.tsx" />

### 包裹组件

<code src="./demo/demo2.tsx" />

## API

```typescript
type BasicTarget<T> = T | (() => T | null) | React.MutableRefObject<T | null>;

type Options<T extends HTMLElement> = {
  wait?: number;
  target?: BasicTarget<T>;
};

type Result = {
  run: (keyword: string) => void;
  cancel: () => void;
  flush: () => void;
};

const useComposingSearch: <T extends HTMLElement = HTMLElement>(
  fn: (keyword: string) => void,
  options?: Options<T>,
) => Result;
```

### 参数

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| fn | 搜索函数，防抖结束后以关键字调用 | `(keyword: string) => void` | - |
| wait | 防抖等待时间（毫秒） | `number` | `300` |
| target | 接收 composition 事件的元素或 Ref。composition 事件会冒泡，包住组件的容器同样可用 | `BasicTarget<HTMLElement>` | `document` |

### 返回值

| 参数 | 说明 | 类型 |
| ---- | ---- | ---- |
| run | 防抖后的搜索函数，在输入框的 `onChange` 中调用 | `(keyword: string) => void` |
| cancel | 取消尚未触发的搜索 | `() => void` |
| flush | 立即触发尚未执行的搜索（不要在组词过程中调用） | `() => void` |

### 行为说明

- 组词期间到达的关键字会被暂存，不会触发搜索。
- 组词结束时，最近的关键字会被重新排入防抖队列；携带上屏文本的 change
  事件会经过同一个防抖函数并替换它，因此最终只对一次上屏文本发起搜索——
  无论浏览器把 change 事件报在 `compositionend` 之前还是之后。
- 如果浏览器在 `compositionend` 之后不再发送 change 事件，会退回到搜索
  组词结束时暂存的关键字，而不是把它丢掉。
