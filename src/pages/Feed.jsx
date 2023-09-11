import { ChannelTab } from '@/components/button';
import FeedHeader from '@/components/layout/FeedHeader';
import FeedList from '@/components/layout/FeedList';
import { Outlet } from 'react-router-dom';

function Feed() {
  window.innerWidth > '768px' ? '-mx-[calc(100vw-768px)]' : null;

  return (
    <div className="z-10 h-full bg-lionly-white">
      <FeedHeader />
      <h2 className="sr-only">피드 페이지</h2>
      <ChannelTab />
      <FeedList/>
      <Outlet />
    </div>
  );
}

export default Feed;
