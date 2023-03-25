/**
 * title: Use greetings
 * desc: A hook that returns a greeting message based on the current time.
 *
 * title.zh-CN: 使用问候语
 * desc.zh-CN: 一个根据当前时间返回问候消息的挂钩。
 */

import React from 'react';
import { useGreeting, useSetState } from 'ahooks';
import type { GreetingsOptions } from 'ahooks/lib/useGreeting';

export default () => {
  const [state, setState] = useSetState<GreetingsOptions>({
    prefix: '',
    suffix: '',
    transform: undefined,
  });
  const greeting = useGreeting(state);

  return (
    <div>
      <div>
        <div style={{ margin: '16px 0' }}>
          <label className="small">Set Prefix:</label>
          <input
            type="text"
            onInputCapture={(e) => setState({ prefix: e.currentTarget.value })}
            style={{ marginLeft: '13px', padding: '5px 2px', width: '300px' }}
          />
        </div>
        <div style={{ margin: '16px 0' }}>
          <label className="small">Set Suffix:</label>
          <input
            type="text"
            onInputCapture={(e) => setState({ suffix: e.currentTarget.value })}
            style={{ marginLeft: '13px', padding: '5px 2px', width: '300px' }}
          />
        </div>
        <div style={{ margin: '16px 0' }}>
          <label htmlFor="transform"> Transform: </label>
          <select
            id="transform"
            value={state.transform}
            onChangeCapture={(e) => setState({ transform: e.currentTarget.value as any })}
            style={{ marginLeft: '5px', padding: '5px 2px', width: '310px' }}
          >
            <option value={undefined}>No Transform</option>
            <option value="uppercase">Uppercase</option>
            <option value="capitalizeFirstLetter">Capitalize First Letter</option>
          </select>
        </div>
      </div>
      <p>Result: {greeting}</p>
    </div>
  );
};
