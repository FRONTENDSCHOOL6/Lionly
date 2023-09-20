import pb from '@/api/pocketbase';
import { ReactComponent as UpArrowSVG } from '@/assets/arrow_Feed_up.svg';
import { ChannelTab, FeedHeader } from '@/components/layout/feed';
import useIsLogin from '@/contexts/AuthProvider';
import {
  useChannel,
  useInfiniteFeed,
  useObserveScroll,
  useScroll,
} from '@/hooks';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

function Feed() {
  useIsLogin();
  const { fetchNextPage } = useInfiniteFeed();
  const { listEndRef } = useObserveScroll(fetchNextPage);
  const { showScrollTopButton, handleScrollTop } = useScroll();
  const { channelList } = useChannel();

  const channelArray = Object.keys(channelList);
  const activatedChannel =
    channelArray[Object.values(channelList).indexOf(true)];

  useEffect(() => {
    (async function subscribeFeeds() {
      await pb
        .collection('feeds')
        .subscribe('*', async ({ record, action }) => {
          console.log(record);
          if (action === 'update') {
            // const feedList = await getFeedList(1, activatedChannel);
          }
        });
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>Feed - {activatedChannel}</title>
      </Helmet>
      <motion.div
        className="z-10 h-full bg-lionly-white pb-6"
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

          <h2 className="sr-only">피드 페이지</h2>

          <ChannelTab />
        </div>

        {showScrollTopButton ? (
          <div className="sticky left-[100%] top-[265px] inline pr-6">
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
      </motion.div>
    </>
  );
}

export default Feed;
