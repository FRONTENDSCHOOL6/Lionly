import getChannelList from '@/api/getChannelList';
import getNodeIndex from '@/utils/getNodeIndex';
import { useQuery } from '@tanstack/react-query';
import { node, string } from 'prop-types';
import { createContext, useState } from 'react';

export const ChannelContext = createContext({});

function ChannelProvider({ displayName = 'ChannelContext', children }) {
  const [channels, setChannels] = useState([]);
  const [select, setSelect] = useState([true]);

  const handleChangeChannel = (e) => {
    const targetIndex = getNodeIndex(e.target.parentNode);
    const clickedState = channels.map((item, index) => {
      return index === targetIndex ? true : false;
    });
    setSelect(clickedState);
  };

  const { status } = useQuery({
    queryKey: ['channels'],
    queryFn: getChannelList,
    onSuccess: (channels) => {
      setChannels(channels);
    },
  });

  console.log(status);

  return (
    <ChannelContext.Provider
      value={{ select, channels, handleChangeChannel }}
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
