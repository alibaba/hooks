import { usePromise } from 'ahooks';
import React, { useEffect, useState } from 'react';

function fakefetch(url: string) {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve('Fetched: ' + url), url.length % 2 === 0 ? 1000 : 500);
  });
}

function Page({ pageId }: { pageId: string }) {
  const [data, setData] = useState<string | null>(null);
  const fetchPage = usePromise(() => fakefetch('/api/' + pageId), [pageId]);

  useEffect(() => {
    (async () => {
      try {
        setData(await fetchPage());
      } catch (_) {}
    })();
  }, [fetchPage]);

  return (
    <section>
      <h1>{pageId}</h1>
      <article>{!data ? 'loading' : data}</article>
    </section>
  );
}

export default () => {
  const [pageId, setPageId] = useState('');

  return (
    <main>
      <button onClick={() => setPageId(pageId + pageId.length)}>Click</button>
      <Page pageId={pageId} />
    </main>
  );
};
