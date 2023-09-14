import { ReactComponent as DownArrowSVG } from '@/assets/arrow_Feed_down.svg';
import { ReactComponent as UpArrowSVG } from '@/assets/arrow_Feed_up.svg';
import ChannelTab from '@/components/ChannelTab';
import FeedHeader from '@/components/layout/FeedHeader';
import useIsLogin from '@/contexts/AuthProvider';
import { useInfiniteFeed, useObserveScroll, useScroll } from '@/hooks';
import { onLoadMoveScrollTop } from '@/utils';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

function Feed() {
  useIsLogin();
  onLoadMoveScrollTop();
  const { hasNextPage } = useInfiniteFeed();
  const { listEndRef } = useObserveScroll();
  const {
    showScrollTopButton,
    showScrollBottomButton,
    handleScrollTop,
    handleScrollBottom,
  } = useScroll();

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

        {showScrollBottomButton ? (
          <button
            role="button"
            aria-label="하단으로 이동"
            type="button"
            onClick={handleScrollBottom}
            className="sticky left-[100%] top-[93.5%] mr-6 rounded-full shadow-lg"
          >
            <DownArrowSVG className="h-7 w-7 rounded-full shadow-lg transition-all  hover:scale-125 focus:scale-125" />
          </button>
        ) : null}

        {showScrollTopButton ? (
          <button
            role="button"
            aria-label="상단으로 이동"
            type="button"
            onClick={handleScrollTop}
            className="sticky left-[100%] top-[26.5%] mr-6 rounded-full shadow-lg"
          >
            <UpArrowSVG className="h-7 w-7 rounded-full shadow-lg transition-all hover:scale-125 focus:scale-125" />
          </button>
        ) : null}

        <Outlet />

        {!hasNextPage ? (
          <p
            role="status"
            className="pt-6 text-center text-lionly-base text-lionly-red"
          >
            마지막 게시글입니다.
          </p>
        ) : null}
        <div ref={listEndRef} className="absolute bottom-[300px]"></div>
      </div>
    </>
  );
}

export default Feed;
