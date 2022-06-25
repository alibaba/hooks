import React, { useEffect, useState } from 'react';
import { useLazy } from 'ahooks';

function fakefetch(url: string) {
  return Promise.resolve(`${url} online: ${Math.floor(Math.random() * 1000)}`);
}

export default () => {
  const [a, setA] = useState(0);
  const [data, setData] = useState<string | null>(null);
  const getA = useLazy(() => fakefetch('/a/' + a), [a]);

  useEffect(() => {
    getA().then((dataA) => setData(dataA));
  }, [getA]);

  return (
    <main>
      <button onClick={() => setA((v) => v + 1)}>Click</button>
      <article>{data}</article>
    </main>
  );
};
