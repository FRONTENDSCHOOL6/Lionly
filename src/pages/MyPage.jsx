import { ReactComponent as UpArrowSVG } from '@/assets/arrow_Feed_up.svg';
import MyFeedList from '@/components/layout/MyFeedList';
import MyPageHeader from '@/components/layout/MyPageHeader';
import useIsLogin from '@/contexts/AuthProvider';
import { useObserveScroll, useScroll } from '@/hooks';
import useInfiniteMyFeed from '@/hooks/useInfiniteMyFeed';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

function MyPage() {
  useIsLogin();
  const { hasNextPage, fetchNextPage } = useInfiniteMyFeed();
  const { listEndRef } = useObserveScroll(fetchNextPage);
  const { showScrollTopButton, handleScrollTop } = useScroll();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
      }}
    >
      <Helmet>
        <title>Lionly - MyPage</title>
      </Helmet>
      <header className="sticky top-0 z-10">
        <MyPageHeader />
        <div className=" bg-lionly-white">
          <p className="mx-2 border-b-4 border-lionly-black bg-lionly-white px-11 py-3 text-center text-lionly-lg text-lionly-black">
            내가 쓴 글
          </p>
        </div>
      </header>
      <div className="z-10 h-full bg-lionly-white">
        {showScrollTopButton ? (
          <div className="sticky left-[100%] top-[370px] z-10 inline pr-6">
            <button
              role="button"
              aria-label="상단으로 이동"
              tabIndex="0"
              type="button"
              onClick={handleScrollTop}
              className="rounded-full border-2 border-lionly-white transition-all hover:scale-125 focus:scale-125"
            >
              <UpArrowSVG className="h-7 w-7 rounded-full shadow-2xl" />
            </button>
          </div>
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
    </motion.div>
  );
}

export default MyPage;
