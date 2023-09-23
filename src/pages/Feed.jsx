import { ReactComponent as UpArrowSVG } from '@/assets/arrow_Feed_up.svg';
import { ChannelTab, FeedHeader } from '@/components/layout/feed';
import useIsLogin from '@/contexts/AuthProvider';
import {
  useActivateChannel,
  useInfiniteFeed,
  useObserveScroll,
  useScroll,
} from '@/hooks';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

function Feed() {
  useIsLogin();
  const { selectedChannel } = useActivateChannel();
  const { showScrollTopButton, handleScrollTop } = useScroll();
  const { fetchNextPage } = useInfiniteFeed();
  const { listEndRef } = useObserveScroll(fetchNextPage);

  return (
    <>
      <Helmet>
        <title>Feed - {selectedChannel}</title>
      </Helmet>
      <motion.div
        className="z-10 min-h-screen bg-lionly-white pb-4"
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
        <div className="sticky top-0 z-10">
          <FeedHeader />

          <h2 className="sr-only">피드 - {selectedChannel}</h2>

          <ChannelTab />
        </div>

        <Outlet />

        {showScrollTopButton ? (
          <div className="fixed right-[13%] top-[265px] inline pr-6">
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

        <div ref={listEndRef} className="absolute bottom-[300px]"></div>
      </motion.div>
    </>
  );
}

export default Feed;
