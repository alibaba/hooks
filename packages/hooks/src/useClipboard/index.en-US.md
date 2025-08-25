---
nav:
  path: /hooks
---

# useClipboard

A Hook for managing clipboard operations. It supports copying and pasting any type of data to the system clipboard, allows displaying custom text when pasting outside the project, and provides comprehensive error handling and permission checks.

## Demos


### Default usage

<code src="./demo/demo1.tsx" />

### Permission Check and Error Handling

<code src="./demo/demo2.tsx" />


### Real-time clipboard monitoring

<code src="./demo/demo3.tsx" />

## API

```
const { copy, paste, isSupported, hasPermission } = useClipboard();
```

### Result

|Parameter|Description|Type|
|---|---|---|
|copy|Copies data to the clipboard.|`<T>(displayText: string, data: T) => Promise<void>`|
|paste|Pastes data from the clipboard.|`<T>() => Promise<T \| string \| null>`|
|isSupported|Whether the current environment supports the Clipboard API.|`boolean`|
|hasPermission|Checks for clipboard permissions.|`() => Promise<boolean>`|

### copy

Copies data to the clipboard, supporting any serializable data structure.

**Parameters:**

|Parameter|Description|Type|Required|
|---|---|---|---|
|displayText|The plain text to be displayed in the clipboard.|`string`|Yes|
|data|The data to be copied, can be any serializable object.|`T`|Yes|

**Example:**

```
// Copy text
await copy('Hello World', 'Hello World');

// Copy an object
await copy('User Info', { id: 1, name: 'John', age: 25 });

// Copy an array
await copy('Shopping List', ['Apple', 'Banana', 'Orange']);
```

### paste

Reads data from the clipboard and automatically identifies the data type.

**Return Value:**

- If it's structured data copied via `copy`, it returns the original data.

- If it's plain text, it returns a string.

- If the clipboard is empty or the read fails, it returns `null`.


**Example:**

```
const data = await paste();

if (typeof data === 'string') {
  console.log('Pasted text:', data);
} else if (data && typeof data === 'object') {
  console.log('Pasted structured data:', data);
} else {
  console.log('Clipboard is empty or read failed.');
}
```

### Error Handling

The hook throws errors of type `ClipboardError`, which include a detailed error message and an error code.

**Error Codes:**

|Error Code|Description|
|---|---|
|UNSUPPORTED|Clipboard API is not supported in the current environment.|
|INVALID_INPUT|Invalid input parameters.|
|DATA_TOO_LARGE|Data exceeds the size limit (1MB).|
|PERMISSION_DENIED|User denied clipboard permission.|
|SECURITY_ERROR|Security policy prevents clipboard access.|
|COPY_FAILED|The copy operation failed.|
|PASTE_FAILED|The paste operation failed.|

**Example:**

```
try {
  await copy('Data', someData);
} catch (error) {
  if (error instanceof ClipboardError) {
    console.error(`Clipboard Error [${error.code}]:`, error.message);
  }
}
```

## Notes

1. **Environment**: Must be used in an HTTPS environment or on `localhost`.

2. **Permissions**: The browser will request clipboard permissions on the first use.

3. **Data Size**: It is recommended that the data for a single copy operation not exceed 1MB.

4. **Compatibility**: Requires a modern browser that supports the Clipboard API.

5. **Security**: Sensitive data will exist temporarily in the clipboard; be mindful of security when using.
