/**
 * title: Each api
 * desc: manual operation task reset, continue, pause, execution interval, decrement value
 *
 * title.zh-CN: 各api
 * desc.zh-CN: 手动操作任务的重置、继续、暂停、执行间隔、递减值
 */

import React, { useState } from 'react';
import useCountDown from '../index';

function Apis() {
  const {
    time,
    remaining,
    restartTask,
    continueTask,
    stopTask,
    setInterval,
    setDecreasing,
  } = useCountDown({ baseTime: 10 * 60 * 1000 });
  const [base, setBase] = useState(0);
  const [intervalState, setIntervalState] = useState(0);
  const [decreasingState, setDecreasingState] = useState(0);
  return (
    <div>
      <p>{JSON.stringify(time)}</p>
      <p>{remaining}</p>
      <div>
        <button onClick={() => restartTask()}>restart</button>
        <button onClick={() => continueTask()}>continue</button>
        <button onClick={() => stopTask()}>stop</button>
      </div>
      <div style={{ margin: '8px 0px' }}>
        <input type="number" onInput={(event) => setBase(parseInt(event.currentTarget.value))} />
        <button onClick={() => restartTask(base)}>restart base</button>
      </div>
      <div style={{ margin: '8px 0px' }}>
        <input
          type="number"
          onInput={(event) => setIntervalState(parseInt(event.currentTarget.value))}
        />
        <button onClick={() => setInterval(intervalState)}>set interval</button>
      </div>
      <div style={{ margin: '8px 0px' }}>
        <input
          type="number"
          onInput={(event) => setDecreasingState(parseInt(event.currentTarget.value))}
        />
        <button onClick={() => setDecreasing(decreasingState)}>set decreasing</button>
      </div>
    </div>
  );
}

export default Apis;
