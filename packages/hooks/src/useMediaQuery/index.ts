import { useRef, useState } from 'react';

function useMediaQuery<K, T>(queries: K[], values: T[], defaultValue: T) {
  const mediaQueryLists = useRef<MediaQueryList[]>([]);
  const [value, setValue] = useState<T>(defaultValue);
  const [currentQuery, setCurrentQuery] = useState<string>((queries as MediaQueryList[])[0].media);

  const getValue = () => {
    const index = mediaQueryLists.current.findIndex((mql) => mql.matches);
    setCurrentQuery(mediaQueryLists.current?.[index]?.media);
    return values?.[index] || defaultValue;
  };

  const handleQueryListener = () => setValue(getValue());

  const handleMediaQueryLists = () => {
    mediaQueryLists.current.forEach((mql) =>
      mql.removeEventListener('change', handleQueryListener),
    );
    mediaQueryLists.current = queries.map((query) => window.matchMedia(query as string));
    mediaQueryLists.current.forEach((mql) => mql.addEventListener('change', handleQueryListener));
    setValue(getValue());
  };

  useState(() => {
    handleMediaQueryLists();
  });

  return [value, currentQuery];
}

export default useMediaQuery;
