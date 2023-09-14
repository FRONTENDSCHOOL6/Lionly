import { useCallback, useEffect, useRef, useState } from 'react';
import useInfiniteFeed from './useInfiniteFeed';

function useObserveScroll() {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const { fetchNextPage } = useInfiniteFeed();

  const listEndRef = useRef(null);
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;

      if (target.isIntersecting) {
        setShowScrollTopButton(true);
        fetchNextPage();
      } else if (document.documentElement.scrollTop < 500) {
        setShowScrollTopButton(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [document.documentElement.scrollTop]
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

  return { listEndRef, showScrollTopButton };
}

export default useObserveScroll;
