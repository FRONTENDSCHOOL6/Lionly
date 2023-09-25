import { useEffect, useState } from 'react';

function useScroll() {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const handleScrollTop = () => {
    scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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

  return {
    showScrollTopButton,
    handleScrollTop,
  };
}

export default useScroll;
