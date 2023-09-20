import { ReactComponent as UpArrowSVG } from '@/assets/arrow_Feed_up.svg';
import { ChannelTab, FeedHeader } from '@/components/layout/feed';
import useIsLogin from '@/contexts/AuthProvider';
import { useInfiniteFeed, useObserveScroll, useScroll } from '@/hooks';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

function Feed() {
  useIsLogin();
  const { fetchNextPage } = useInfiniteFeed();
  const { listEndRef } = useObserveScroll(fetchNextPage);
  const { showScrollTopButton, handleScrollTop } = useScroll();

  let title;
  switch (window.location.pathname) {
    case '/feed/dailys':
      title = '일상방';
      break;
    case '/feed/foods':
      title = '맛집방';
      break;
    case '/feed/jobs':
      title = '취업방';
      break;
    case '/feed/healings':
      title = '힐링방';
      break;

    default:
      title = '전체 게시글';
      break;
  }

  return (
    <>
      <Helmet>
        <title>Feed - {title}</title>
      </Helmet>

      <div className="z-10 h-full bg-lionly-white pb-6">
        <div className="sticky top-0 z-10">
          <FeedHeader />

          <h2 className="sr-only">피드 페이지</h2>

          <ChannelTab />
        </div>

        {showScrollTopButton ? (
          <div className="sticky left-[100%] top-[27.5%] inline pr-6">
            <button
              role="button"
              aria-label="상단으로 이동"
              tabIndex="0"
              type="button"
              onClick={handleScrollTop}
              className="rounded-full transition-all hover:scale-125 focus:scale-125"
            >
              <UpArrowSVG className="h-7 w-7 rounded-full shadow-2xl" />
            </button>
          </div>
        ) : null}

        <Outlet />

        <div ref={listEndRef} className="absolute bottom-[300px]"></div>
      </div>
    </>
  );
}

export default Feed;
