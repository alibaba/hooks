---
nav:
  path: /hooks
---

# useTimer

Some methods for time management, such as countdown and timer. Consolidate operations related to time into a single hook. For example, the countdown function can be done without any mental burden, thereby improving its business logic on this basis, and the business logic does not need to include too many countdown functions

# Examples

## Basic usage

<code src="./demo/demo1.tsx"></code>
<code src="./demo/demo2.tsx"></code>
<code src="./demo/demo3.tsx"></code>

## API

```ts
const returnValue= useTimer<T extends number| Date >(
  time: number | Date,
  options: Options,
  deps: DependencyList = [],
):ReturnValue<T>;
```

### parameter

| parameter | illustrate               | type    | default value |
| --------- | ------------------------ | ------- | ------------- |
| time      | Total countdown time (s) | number  | Date          |
| options   | Related options          | Options | {}            |
| deps      | Dependency array         | any[]   | []            |

### return value

| 参数          | 说明                                                                                                                                                                                                       | 类型                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| seconds       | Calculate the remaining seconds                                                                                                                                                                            | string                                                         |
| minutes       | The remaining minutes                                                                                                                                                                                      | string                                                         |
| hours         | Calculate the remaining hours                                                                                                                                                                              | string                                                         |
| days          | Number of days after division                                                                                                                                                                              | string                                                         |
| remainingTime | How many milliseconds are left overall                                                                                                                                                                     | number                                                         |
| isPaused      | Is it in pause (this parameter will only be returned if the passed parameter is of type number)                                                                                                            | boolean                                                        |
| isCounting    | Is the countdown in progress (this parameter will only be returned if the passed parameter is of type number)                                                                                              | boolean                                                        |
| start         | Start/Resume (this parameter will only be returned if the input parameter is of type number)                                                                                                               | () => void                                                     |
| pause         | Pause (this parameter will only be returned if the input parameter is of type number)                                                                                                                      | () => void                                                     |
| reset         | Reset, with Begin: whether to start immediately after reset; ResetTime: The number of milliseconds reset, default is time. (This parameter will only be returned if the input parameter is of type number) | (withBegin: boolean = false, resetTime: number = time) => void |

### Options

| 参数        | 说明                                           | 类型       | 默认值   |
| ----------- | ---------------------------------------------- | ---------- | -------- |
| onComplete  | The callback after the countdown ends          | () => void | () => {} |
| auto        | Do you want to start the countdown immediately | boolean    | true     |
| isCountDown | Is it mandatory to switch to countdown mode    | boolean    | false    |
