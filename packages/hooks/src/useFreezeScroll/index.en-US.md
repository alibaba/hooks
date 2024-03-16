---
nav:
  path: /hooks
---

# useFreezeScroll

React hook that freezes the scroll and removes the scrollbar from the browser window when it is active without any layout shift, for example, when a modal is opened. It doesn't work on fixed position elements.

## Examples

### Default usage

```jsx
import { useFreezeScroll } from 'ahooks';
import React, { useState } from 'react';

export default () => {
  const [isActive, setIsActive] = useState(false);
  useFreezeScroll(isActive);

  return (
      <div style={{ height: '300px' }}>
        <div style={{ marginTop: '20px' }}>
          <p>Scroll should be frozen when enabled.</p>
          <p>Try scrolling to test the effect.</p>
        </div>
        <button onClick={() => setIsActive(!isActive)} style={{ position: 'sticky', top: '100px' }}>
          {isActive ? 'Disable Freeze Scroll' : 'Enable Freeze Scroll'}
        </button>
      </div>
  );
};
```

## API

```javascript
useFreezeScroll(isActive)
```

### Params

| Property | Description    | Type    | Default |
| -------- | -------------- | ------- | ------- |
| isActive | state of modal | boolean | -       |
