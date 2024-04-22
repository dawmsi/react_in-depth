import { useRef, useState, useEffect, MutableRefObject } from 'react';

interface Options {
  root?: Element;
  rootMargin?: string;
  threshold?: number;
  onIntersect?(): void;
}

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];

export function useIntersectionObserver(options: Options = {}): HookReturnType {
  const {
    threshold = 1.0,
    root = null,
    rootMargin = '0px',
    onIntersect,
  } = options;

  const targetRef = useRef(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          onIntersect?.();
        }

        setEntry(entry);
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );
    const currentRef = targetRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return function () {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [onIntersect, root, rootMargin, threshold]);

  return [targetRef, entry];
}
