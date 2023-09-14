import { useEffect, useState } from 'react';

function useScroll() {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    const handleShowButton = () => {
      document.documentElement.scrollTop >
      document.documentElement.clientHeight * 0.5
        ? setShowScrollTopButton(true)
        : setShowScrollTopButton(false);
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

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

  return { showScrollTopButton, handleScrollTop, handleScrollBottom };
}

export default useScroll;
