# API Standards

This is ahooks API specification document.

## Return value

### 1. no output

Hooks are allowed to have no output, which is generally common in life cycle Hooks.

```javascript
useMount(()=>{});
```

### 2. value type

Hooks have one output value.

```javascript
const documentVisibility = useDocumentVisibility();
```
### 3. value setValue type

The output is value and setValue, the structure is `[value, setValue]` 。

```javascript
const [state, setState] = useLocalStorageState(...)
```

### 4. value actions type

The output is single value and multiple actions type, the structure is `[value, actions]` 。

```javascript
const [current, { inc, dec, set, reset }] = useCounter(...);
```

### 5. values type

The output is multi-value type, the structure is `{...values}` 

```javascript
const {text, left, right, ...} = useTextSelection();
```
### 6. values actions type

The output is multi-value and multi-actions type, the structure is `{...values, ...actions}` 。

```javascript
const {data, error, loading, run} = useRequest(...);
```


## Parameter

In principle, more than two parameters are not allowed.

### 1. No parameters

Allow Hooks have no parameters.

```javascript
const documentVisibility = useDocumentVisibility();
```

### 2. Single input

Direct input regardless of whether a single parameter is required.

```javascript
const size = useSize(dom);
```
### 3. Multiple required parameters

The number of required parameters is less than 2, and should be input at the same level.

```javascript
const ref = useKeyPress(keyFilter, eventHandler)
```

If there are more than two, they should be entered as an object.

### 4. Many non-required parameters

Multiple non-required parameters are entered as objects.

```javascript
const result = useDrop({onText?, onFiles?, onURI?, onDOM?});

const result = useRequest(service, {
  manual?,
  initialData?,
  onSuccess?,
});
```

### 5. Required parameters + non-required parameters

Required parameters are before and non-required parameters are after.

```javascript
const result = useTextSelection(items, defaultSelected?);
```


