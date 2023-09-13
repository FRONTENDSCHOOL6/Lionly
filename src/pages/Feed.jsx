import { ReactComponent as DownArrowSVG } from '@/assets/arrow_Feed_down.svg';
import { ReactComponent as UpArrowSVG } from '@/assets/arrow_Feed_up.svg';
import { ChannelTab } from '@/components/button';
import FeedHeader from '@/components/layout/FeedHeader';
import useIsLogin from '@/contexts/AuthProvider';
import useFeed from '@/hooks/useFeed';
import { moveScrollTop } from '@/utils';
import { memo } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

function Feed() {
  useIsLogin();
  moveScrollTop();

  const { hasNextPage, fetchNextPage } = useFeed();

  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const scrollTopButtonRef = useRef(null);
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
  }, [fetchNextPage, hasNextPage, handleObserver]);

  return (
    <>
      <Helmet>
        <title>Lionly - Feed</title>
      </Helmet>

      <div className="z-10 h-full bg-lionly-white">
        <div className="sticky top-0 z-10">
          <FeedHeader />
          <h2 className="sr-only">피드 페이지</h2>
          <ChannelTab />
        </div>

        <button
          aria-label="게시글 불러오기"
          type="button"
          onClick={handleScrollBottom}
          className="sticky left-[100%] top-[93.5%] mr-6 rounded-full shadow-lg"
        >
          <DownArrowSVG className="h-7 w-7 rounded-full shadow-lg transition-all  hover:scale-125 focus:scale-125" />
        </button>

        {showScrollTopButton ? (
          <button
            ref={scrollTopButtonRef}
            aria-label="상단으로 이동"
            type="button"
            onClick={handleScrollTop}
            className="sticky left-[100%] top-[26.5%] mr-6 rounded-full shadow-lg transition-all"
          >
            <UpArrowSVG className="h-7 w-7 rounded-full shadow-lg transition-all hover:scale-125 focus:scale-125" />
          </button>
        ) : null}

        <Outlet />

        <div ref={listEndRef} className="h-6"></div>
      </div>
    </>
  );
}

export default memo(Feed);
