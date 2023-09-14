import { useCallback, useEffect, useRef } from 'react';
import useInfiniteFeed from './useInfiniteFeed';

function useObserveScroll() {
  const { fetchNextPage } = useInfiniteFeed();
  const listEndRef = useRef(null);
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;

      if (target.isIntersecting) {
        fetchNextPage();
      }
    },
    [fetchNextPage]
  );

  useEffect(() => {
    const element = listEndRef.current;
    const option = {
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    element && observer.observe(element);

    return () => {
      element && observer.unobserve(element);
    };
  }, [handleObserver]);

  return { listEndRef };
}

export default useObserveScroll;
