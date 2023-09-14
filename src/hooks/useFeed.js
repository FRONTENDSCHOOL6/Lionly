import getFeed from '@/api/getFeed';
import { useQuery } from '@tanstack/react-query';
import useChannel from './useChannel';

function useFeed(feedId) {
  const { isLoading, data } = useQuery({
    queryKey: ['feedList', window.location.pathname],
    queryFn: () => getFeed(feedId),
  });

  const comment = data?.expand.comments.map((comment) => {
    return comment;
  });

  const { channelList } = useChannel();
  const selectedChannelIndex = Object.values(channelList).indexOf(true);
  const selectedChannel = Object.keys(channelList)[selectedChannelIndex];
  let pathname;

  switch (selectedChannel) {
    case '전체 게시글':
      pathname = '/feed';
      break;
    case '일상방':
      pathname = '/feed/dailys';
      break;
    case '맛집방':
      pathname = '/feed/foods';
      break;
    case '취업방':
      pathname = '/feed/jobs';
      break;
    case '힐링방':
      pathname = '/feed/healings';
      break;
  }

  return { isLoading, data, comment, pathname };
}

export default useFeed;
