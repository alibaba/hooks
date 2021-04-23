/**
 * title: Basic usage
 * desc: In the scene without usecursor, if input is started from the middle, the cursor will jump to the end
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 不使用 useCursor 的场景下，如果从中间开始输入，光标会跳至尾部
 */

import React, { useState } from 'react';

const formatValue = (value) => {
  return value
    .toString()
    .replace(/[^.-\d]/g, '')
    .replace(/\d+/, n => n.replace(/(\d)(?=(\d{3})+$)/g, $1 => `${$1},`))
}

const getNumberString = (input: string): string => {
  if (typeof input === 'number') return `${input}`
  if (typeof input !== 'string') return ''
  return input.replace(/[^.-\d]/g, '')
}

export default () => {
  const [value, setValue] = React.useState('12345')

  const formatedValue = formatValue(value)


  const onChange = (e) => {
    setValue(getNumberString(e.target.value))
  }

  return (
    <div>
      <input
        type="text"
        value={formatedValue}
        onChange={onChange}
      />
    </div>
  )
}