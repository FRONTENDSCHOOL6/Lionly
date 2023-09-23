import { useChannel } from '@/contexts/Channel';

function useActivateChannel() {
  let pathname;

  const { channelList } = useChannel();
  const selectedChannelIndex = Object.values(channelList).indexOf(true);
  const selectedChannel = Object.keys(channelList)[selectedChannelIndex];

  switch (selectedChannel) {
    case '전체 게시글':
      pathname = '/feed';
      break;

    case '일상방':
      pathname = '/feed/daily';
      break;

    case '맛집방':
      pathname = '/feed/food';
      break;

    case '취업방':
      pathname = '/feed/job';
      break;

    case '힐링방':
      pathname = '/feed/healing';
      break;
  }

  return { pathname, selectedChannel };
}

export default useActivateChannel;
