import getChannelList from '@/api/getChannelList';
import getNodeIndex from '@/utils/getNodeIndex';
import { node, string } from 'prop-types';
import { createContext, useEffect, useState } from 'react';

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

  useEffect(() => {
    async function channels() {
      const channelList = await getChannelList();
      setChannels(channelList);
    }
    channels();
  }, []);

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
