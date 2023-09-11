import getChannelList from '@/api/getChannelList';
import getNodeIndex from '@/utils/getNodeIndex';
import { useQuery } from '@tanstack/react-query';
import { node, string } from 'prop-types';
import { createContext, useState } from 'react';

export const ChannelContext = createContext({});

function ChannelProvider({ displayName = 'ChannelContext', children }) {
  const [channels, setChannels] = useState([]);
  const [select, setSelect] = useState([true]);
  const [selectedChannel, setSelectedChannel] = useState('전체 게시글');

  /* pockethost에 있는 데이터에 따라 채널을 만들어줍니다. */
  const { isLoading } = useQuery({
    queryKey: ['channels'],
    queryFn: getChannelList,
    onSuccess: (channels) => {
      setChannels(channels);
    },
    retry: 2,
  });

  const handleChangeChannel = (e) => {
    const selectedChannelIndex = getNodeIndex(e.target.parentNode);
    const clickedState = channels.map((item, index) => {
      return index === selectedChannelIndex ? true : false;
    });

    setSelect(clickedState);
    setSelectedChannel(channels[selectedChannelIndex]);
  };

  return (
    <ChannelContext.Provider
      value={{
        select,
        channels,
        selectedChannel,
        isLoading,
        handleChangeChannel,
      }}
      displayName={displayName}
    >
      {children}
    </ChannelContext.Provider>
  );
}

ChannelProvider.propTypes = {
  displayName: string,
  children: node,
};

export default ChannelProvider;
