---
title: useTimer
nav: Hooks
group:
  title: Scene
  order: 5
order: 2
toc: content
demo:
  cols: 1
---

针对时间管理的一些方法，如倒计时和计时器。将关于时间的操作统一收敛到一个hooks里面。例如，可以毫无心智负担地去做倒计时功能,从而在此基础上去完善其业务逻辑，业务逻辑不用包含过多的倒计时功能

# 代码演示

## 基础用法

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

### 参数

| 参数    | 说明              | 类型    | 默认值 |
| ------- | ----------------- | ------- | ------ |
| time    | 倒计时的总时间(s) | number  | Date   |
| options | 相关选项          | Options | {}     |
| deps    | 依赖数组          | any[]   | []     |

### 返回值

| 参数          | 说明                                                                                                                        | 类型                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| seconds       | 求余后的秒数                                                                                                                | string                                                         |
| minutes       | 求余后的分钟数                                                                                                              | string                                                         |
| hours         | 求余后的小时数                                                                                                              | string                                                         |
| days          | 整除后的天数                                                                                                                | string                                                         |
| remainingTime | 总体还剩多少毫秒                                                                                                            | number                                                         |
| isPaused      | 是否处于暂停中（只有传入的参数是 number 类型才会返回此参数）                                                                | boolean                                                        |
| isCounting    | 是否正在倒计时中（只有传入的参数是 number 类型才会返回此参数）                                                              | boolean                                                        |
| start         | 开始/恢复（只有传入的参数是 number 类型才会返回此参数）                                                                     | () => void                                                     |
| pause         | 暂停（只有传入的参数是 number 类型才会返回此参数）                                                                          | () => void                                                     |
| reset         | 复位，withBegin：是否在复位后立即开始；resetTime：复位的毫秒数，默认是 time。（只有传入的参数是 number 类型才会返回此参数） | (withBegin: boolean = false, resetTime: number = time) => void |

### Options

| 参数        | 说明                 | 类型       | 默认值   |
| ----------- | -------------------- | ---------- | -------- |
| onComplete  | 倒计时结束后的回调   | () => void | () => {} |
| auto        | 是否立即开始倒计时   | boolean    | true     |
| isCountDown | 是否强制为倒计时模式 | boolean    | false    |
