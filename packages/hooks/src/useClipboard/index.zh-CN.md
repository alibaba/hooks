---
nav:
  path: /hooks
---

# useClipboard

用于管理剪贴板操作的 Hook，支持复制和粘贴任意类型的数据到系统剪贴板，支持粘贴到项目外时显示自定义文本，并提供完整的错误处理和权限检查。

## 代码演示



### 基础用法

<code src="./demo/demo1.tsx" />

### 权限检查和错误处理

<code src="./demo/demo2.tsx" />


### 实时监听

<code src="./demo/demo3.tsx" />

## API

```typescript
const { copy, paste, isSupported, hasPermission } = useClipboard();
```

### Result

| 参数                | 说明                           | 类型                                                                                    |
| ------------------- | ------------------------------ | --------------------------------------------------------------------------------------- |
| copy     | 复制数据到剪贴板               | `<T>(displayText: string, data: T) => Promise<void>`                                   |
| paste  | 从剪贴板粘贴数据               | `<T>() => Promise<T \| string \| null>`                                                |
| isSupported         | 当前环境是否支持 Clipboard API | `boolean`                                                                               |
| hasPermission       | 检查是否有剪贴板权限           | `() => Promise<boolean>`                                                                |

### copy

复制数据到剪贴板，支持任意类型的数据结构。

**参数:**

| 参数        | 说明                                     | 类型     | 必填 |
| ----------- | ---------------------------------------- | -------- | ---- |
| displayText | 在剪贴板中显示的纯文本                   | `string` | 是   |
| data        | 要复制的数据，可以是任意可序列化的对象   | `T`      | 是   |

**示例:**

```typescript
// 复制文本
await copy('Hello World', 'Hello World');

// 复制对象
await copy('用户信息', { id: 1, name: 'John', age: 25 });

// 复制数组
await copy('购物清单', ['苹果', '香蕉', '橙子']);
```

### paste

从剪贴板读取数据，会自动识别数据类型。

**返回值:**

- 如果是通过 `copy` 复制的结构化数据，返回原始数据
- 如果是普通文本，返回字符串
- 如果剪贴板为空或读取失败，返回 `null`

**示例:**

```typescript
const data = await paste();

if (typeof data === 'string') {
  console.log('粘贴的文本:', data);
} else if (data && typeof data === 'object') {
  console.log('粘贴的结构化数据:', data);
} else {
  console.log('剪贴板为空或读取失败');
}
```

### 错误处理

Hook 会抛出 `ClipboardError` 类型的错误，包含详细的错误信息和错误代码。

**错误代码:**

| 错误代码          | 说明                     |
| ----------------- | ------------------------ |
| UNSUPPORTED       | 当前环境不支持剪贴板 API |
| INVALID_INPUT     | 输入参数无效             |
| DATA_TOO_LARGE    | 数据超过大小限制 (1MB)   |
| PERMISSION_DENIED | 用户拒绝剪贴板权限       |
| SECURITY_ERROR    | 安全策略阻止剪贴板访问   |
| COPY_FAILED       | 复制操作失败             |
| PASTE_FAILED      | 粘贴操作失败             |

**示例:**

```typescript
try {
  await copy('数据', someData);
} catch (error) {
  if (error instanceof ClipboardError) {
    console.error(`剪贴板错误 [${error.code}]:`, error.message);
  }
}
```

## 注意事项

1. **环境要求**: 需要在 HTTPS 环境或 localhost 下使用
2. **权限**: 首次使用时浏览器会请求剪贴板权限
3. **数据大小**: 建议单次复制的数据不超过 1MB
4. **兼容性**: 需要现代浏览器支持 Clipboard API
5. **安全性**: 敏感数据会在剪贴板中短暂存在，使用时需注意安全


