import { ChannelTab } from '@/components/button';
import FeedHeader from '@/components/layout/FeedHeader';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

function Feed() {
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
        <Outlet />
      </div>
    </>
  );
}

export default Feed;
