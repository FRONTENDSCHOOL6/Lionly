import { ReactComponent as DownArrowSVG } from '@/assets/arrow_Feed_down.svg';
import { ChannelTab } from '@/components/button';
import FeedHeader from '@/components/layout/FeedHeader';
import useIsLogin from '@/contexts/AuthProvider';
import useFeed from '@/hooks/useFeed';
import { moveScrollTop } from '@/utils';
import { useCallback, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

function Feed() {
  useIsLogin();
  moveScrollTop();
  const { hasNextPage, fetchNextPage } = useFeed();

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
          onClick={fetchNextPage}
          className="sticky left-[100%] top-[93.5%] mr-6"
        >
          <DownArrowSVG className="h-7 w-7 fill-lionly-black transition-all hover:scale-125" />
        </button>
        {/* <button
          aria-label="상단으로 이동"
          type="button"
          onClick={fetchNextPage}
          className="sticky left-[100%] top-[90%] mr-6"
        >
          <UpArrowSVG className="h-7 w-7" />
        </button> */}
        <Outlet />

        <div ref={listEndRef} className="h-6"></div>
      </div>
    </>
  );
}

export default Feed;
