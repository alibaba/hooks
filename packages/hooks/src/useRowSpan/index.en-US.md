---
nav:
  path: /hooks
---

# useRowSpan

Generate row span data based on the original data source, suitable for merging rows in tables according to hierarchical levels.

## Code Demo

### Basic Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const getRowSpan = useRowSpan(allData, ["city", "school", "six"], currentPageData);
```
### Params

| Parameter       | Description                                                            | Type       | Default Value |
| --------------- | ---------------------------------------------------------------------- | ---------- | ------------- |
| allData         | The full data set to be merged                                         | `T[]`      | -             |
| hierarchy       | Array of hierarchical fields, specifying which fields to merge rows by | `string[]` | `[]`          |
| currentPageData | Optional current page data, used for pagination scenarios              | `T[]`      | `undefined`   |

### Return Value
- Returns a function `getRowSpan` that retrieves the row span information for a specified record and field.

### getRowSpan Function Parameters
| Parameter | Description                                         | Type     |
| --------- | --------------------------------------------------- | -------- |
| record    | The current row data record                         | `T`      |
| field     | The field for which to get the row span information | `string` |

### getRowSpan Function Return Value
| Property | Description                | Type     |
| -------- | -------------------------- | -------- |
| rowspan  | The number of rows to span | `number` |

### Notes

- The order of fields in the `hierarchy` array determines the merging priority, with earlier fields having higher priority.

- If `currentPageData` is provided, row span information will only be calculated based on the current page data.

- This Hook uses `useMemo`, and the calculation will only be re-run when `allData`, `currentPageData`, or `hierarchy` changes.

