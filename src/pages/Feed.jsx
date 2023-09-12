import { ReactComponent as DownArrowSVG } from '@/assets/arrow_Feed_down.svg';
import { ReactComponent as UpArrowSVG } from '@/assets/arrow_Feed_up.svg';
import { ChannelTab } from '@/components/button';
import FeedHeader from '@/components/layout/FeedHeader';
import useFeed from '@/hooks/useFeed';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

function Feed() {
  const { fetchNextPage } = useFeed();

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
          className="sticky left-[100%] top-[90%] mr-6"
        >
          <DownArrowSVG className="h-7 w-7" />
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
      </div>
    </>
  );
}

export default Feed;
