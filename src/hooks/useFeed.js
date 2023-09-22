import getContent from '@/api/getContent';
import { useQuery } from '@tanstack/react-query';
import useChannel from '../contexts/useChannel';

function useFeed(feedId) {
  const { status, data } = useQuery({
    queryKey: ['feedList', window.location.pathname],
    queryFn: () => getContent(feedId),
  });

  let pathname;

  const { channelList } = useChannel();
  const selectedChannelIndex = Object.values(channelList).indexOf(true);
  const selectedChannel = Object.keys(channelList)[selectedChannelIndex];

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

  return { status, data, pathname };
}

export default useFeed;
