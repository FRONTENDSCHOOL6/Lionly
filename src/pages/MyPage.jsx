import { ReactComponent as DownArrowSVG } from '@/assets/arrow_Feed_down.svg';
import { ReactComponent as UpArrowSVG } from '@/assets/arrow_Feed_up.svg';
import MyFeedList from '@/components/layout/MyFeedList';
import MyPageHeader from '@/components/layout/MyPageHeader';
import useIsLogin from '@/contexts/AuthProvider';
import { useObserveScroll, useScroll } from '@/hooks';
import useInfiniteMyFeed from '@/hooks/useInfiniteMyFeed';
import { Helmet } from 'react-helmet-async';

function MyPage() {
  useIsLogin();
  const { hasNextPage, fetchNextPage } = useInfiniteMyFeed();
  const { listEndRef } = useObserveScroll(fetchNextPage);
  const {
    showScrollTopButton,
    showScrollBottomButton,
    handleScrollTop,
    handleScrollBottom,
  } = useScroll();

  return (
    <>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>
      <MyPageHeader />
      <div className="z-10 h-full bg-lionly-white">
        <p className="mx-4 mb-4 mt-9 border-b-4 border-lionly-black px-11 py-3 text-center text-lionly-lg text-lionly-black">
          내가 쓴 글
        </p>

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

        <MyFeedList />

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

export default MyPage;
