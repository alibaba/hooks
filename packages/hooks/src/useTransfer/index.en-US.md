---
nav:
  path: /hooks
---

# useTransfer

Encapsulates the common logic of Antd Transfer.

## Examples

### Default Usage

<code src="./demo/demo1.tsx" />

### Advanced Usage

<code src="./demo/demo2.tsx" />

## API

```typescript
const result: ReturnValue<Item> = useTransfer<Item>(
  dataSource: Item[],
  options: Options = {}
);
```

### Params

| Property   | Description                                                                                 | Type    |
| ---------- | ------------------------------------------------------------------------------------------- | ------- |
| dataSource | Transfer Component data source                                                              | Item[]  |
| options    | Optional configuration item that can be used to configure default data for server rendering | Options |

### Result

| Property                     | Description                                                              | Type                                                                      |
| ---------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| transferProps.dataSource     | Transfer Component data source                                           | Item[]                                                                    |
| transferProps.targetKeys     | Right data item                                                          | string[]                                                                  |
| transferProps.selectedKeys   | selected item                                                            | string[]                                                                  |
| transferProps.disabled       | Whether to disable                                                       | boolean                                                                   |
| transferProps.showSearch     | Searchable or not                                                        | boolean                                                                   |
| transferProps.filterOption   | Antd Transfer searches using filter properties                           | any                                                                       |
| transferProps.onChange       | The callback function when the option is transferred between two columns | (nextTargetKeys: string[], direction: string, moveKeys: string[]) => void |
| transferProps.onSelectChange | The callback function when the selected item changes                     | (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void      |
| noTargetKeys                 | Left data item                                                           | string[]                                                                  |
| unSelectedKeys               | Unselected item                                                          | string[]                                                                  |
| setTargetKeys                | Set the data item on the right                                           | (keys: string[]) => void                                                  |
| setSelectedKeys              | Set check item                                                           | (keys: string[]) => void                                                  |
| setDisabled                  | Set whether to disable                                                   | (disabled: boolean) => void                                               |
| setShowSearch                | Set whether to search                                                    | (showSearch: boolean) => void                                             |
| leftAll                      | Move all data to the left                                                | () => void                                                                |
| rightAll                     | Move all data to the right                                               | () => void                                                                |
| selectAll                    | check all                                                                | () => void                                                                |
| unSelectAll                  | All reverse selection                                                    | () => void                                                                |

### Options

| Property            | Description                                                              | Type                                                                      | Default |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------- | ------- |
| defaultTargetKeys   | Default right data item                                                  | string[]                                                                  | []      |
| defaultSelectedKeys | Default check item                                                       | string[]                                                                  | []      |
| defaultDisabled     | Disabled by default                                                      | boolean                                                                   | false   |
| deafultShowSearch   | Default whether to search                                                | boolean                                                                   | false   |
| onChange            | The callback function when the option is transferred between two columns | (nextTargetKeys: string[], direction: string, moveKeys: string[]) => void | -       |
