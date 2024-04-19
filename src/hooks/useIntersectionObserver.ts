import { useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number;
  root?: Element;
  rootMargin?: string;
}

export function useIntersectionObserver(
  options: Options = {}
): [React.MutableRefObject<null>, IntersectionObserverEntry?] {
  const targetRef = useRef(null);

  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const { threshold = 1.0, root = null, rootMargin = '0px' } = options;

  function callbackFn(entries: IntersectionObserverEntry[]) {
    const [_entry] = entries;

    setEntry(_entry);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFn, {
      threshold,
      root,
      rootMargin,
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
      return function () {
        observer.disconnect();
      };
    }
  }, [threshold, root, rootMargin]);

  return [targetRef, entry];
}
