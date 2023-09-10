import { ChannelContext } from '@/contexts/Channel';
import { useContext } from 'react';

function useChannel() {
  const value = useContext(ChannelContext);

  if (value === undefined) {
    throw new Error(
      'useChannel Hook은 ChannelProvider 안에서 사용되어야 합니다.'
    );
  }

  return value;
}

export default useChannel;
