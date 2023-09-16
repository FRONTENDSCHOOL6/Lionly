import { useEffect, useState } from 'react';
import useInfiniteFeed from './useInfiniteFeed';

function useScroll() {
  const { hasNextPage } = useInfiniteFeed();

  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [showScrollBottomButton, setShowScrollBottomButton] = useState(true);
  const handleScrollTop = () => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleScrollBottom = () => {
    scrollTo({
      top: 1000000,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      document.documentElement.scrollTop >
      document.documentElement.clientHeight * 0.5
        ? setShowScrollTopButton(true)
        : setShowScrollTopButton(false);

      !hasNextPage &&
      document.documentElement.scrollTop ===
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight
        ? setShowScrollBottomButton(false)
        : setShowScrollBottomButton(true);
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, [hasNextPage]);

  return {
    showScrollTopButton,
    showScrollBottomButton,
    handleScrollTop,
    handleScrollBottom,
  };
}

export default useScroll;
