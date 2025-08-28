/**
 * title: Configure the server time
 * desc: Because users may change their local system time, the countdown can become inaccurate when using targetDate.
 *
 * title.zh-CN: 配置服务器时间
 * desc.zh-CN: 防止用户修改本地时间，导致配置 targetDate 时倒计时不准确，通过 currentServerTime 配置当前服务器时间
 */

import React, { useMemo } from "react";
import { useCountDown } from "ahooks";

const App: React.FC = () => {
  // should be get from server
  const currentServerTime = useMemo(() => Date.now(), []);

  const [countdown] = useCountDown({ leftTime: 60 * 1000, currentServerTime });
  return <p>{countdown}</p>;
};

export default App;
