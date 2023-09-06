import { channelData } from '@/components/Button/ChannelButtonList';
import getNodeIndex from '@/utils/getNodeIndex';
import { node, string } from 'prop-types';
import { createContext, useState } from 'react';

export const ChannelContext = createContext({});

function ChannelProvider({ displayName = 'ChannelContext', children }) {
  const trueArray = [true];
  const falseArray = Array(channelData.length - 1).fill(false);
  const initialState = [...trueArray, ...falseArray];

  const [select, setSelect] = useState(initialState);
  const handleChangeChannel = (e) => {
    const targetIndex = getNodeIndex(e.target.parentNode);
    const clickedState = initialState.map((item, index) => {
      return index === targetIndex ? true : false;
    });
    setSelect(clickedState);
  };

  return (
    <ChannelContext.Provider
      value={{ select, handleChangeChannel }}
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
