import { node } from 'prop-types';
import { string } from 'prop-types';
import { useState } from 'react';
import { createContext } from 'react';
import { channelData } from '@/components/Button/ChannelButtonList';

export const ChannelContext = createContext({});

function ChannelProvider({ displayName = 'ChannelContext', children }) {
  const trueArray = [true];
  const falseArray = Array(channelData.length - 1).fill(false);
  const initialState = [...trueArray, ...falseArray];

  const [select, setSelect] = useState([initialState]);

  const handleChangeChannel = (e) => {
    console.log(e.target);
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
