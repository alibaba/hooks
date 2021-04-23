/**
 * title: Basic usage
 * desc: Using useCursor, the cursor can be displayed normally no matter where you input it
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 使用 useCursor ，无论从什么地方输入光标都能正常显示
 */

import React, { useState } from 'react';
import useCursor from '../index'

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
  const [focus, setFocus] = React.useState(false)
  const inputRef = React.useRef()

  const [recordCursor, restoreCursor] = useCursor(inputRef.current, focus)

  const formatedValue = formatValue(value)

  React.useEffect(() => {
    restoreCursor()
  }, [value])

  const onChange = (e) => {
    recordCursor()
    setValue(getNumberString(e.target.value))
  }

  return (
    <div>
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        ref={inputRef}
        type="text"
        value={formatedValue}
        onChange={onChange}
      />
    </div>
  )
}