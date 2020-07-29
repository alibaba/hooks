import React, { useState } from 'react';
import useDebounceEffect from '../../useDebounceEffect';
import useDebounceUpdateEffect from '..';

export default () => {
  const [value, setValue] = useState<string>('hello');

  const [records1, setRecords1] = useState<string[]>([]);
  const [records2, setRecords2] = useState<string[]>([]);

  useDebounceEffect(
    () => {
      setRecords1((val) => [...val, value]);
    },
    [value],
    {
      wait: 1000,
    },
  );

  useDebounceUpdateEffect(
    () => {
      setRecords2((val) => [...val, value]);
    },
    [value],
    {
      wait: 1000,
    },
  );

  return (
    <div>
      <section>
        <div>useDebounceEffect:</div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Typed value"
          style={{ width: 280 }}
        />
        <p style={{ marginTop: 16 }}>
          <ul>
            {records1.map((record, index) => (
              <li key={index}>{record}</li>
            ))}
          </ul>
        </p>
      </section>
      <section>
        <div>useDebounceUpdateEffect:</div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Typed value"
          style={{ width: 280 }}
        />
        <p style={{ marginTop: 16 }}>
          <ul>
            {records2.map((record, index) => (
              <li key={index}>{record}</li>
            ))}
          </ul>
        </p>
      </section>
    </div>
  );
};
