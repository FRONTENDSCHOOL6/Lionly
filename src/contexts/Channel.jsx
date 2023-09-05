import { node, string } from 'prop-types';
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const ChannelContext = createContext();

function ChannelProvider({ displayName = 'ChannelContext', children }) {
  const [select, setSelect] = useState(false);
  const handleChangeChannel = (e) => {
    const target = e.target;
    console.log(document.querySelector('input:checked'));
  };

  return (
    <ChannelContext.Provider
      displayName={displayName}
      value={{ select, handleChangeChannel }}
    >
      {children}
    </ChannelContext.Provider>
  );
}

export function useChannel() {
  const value = useContext(ChannelContext);

  if (value === undefined) {
    throw new Error(
      'useChannel Hook은 ChannelProvider 안에서 사용되어야 합니다.'
    );
  }

  return value;
}

ChannelProvider.propTypes = {
  displayName: string,
  children: node,
};

export default ChannelProvider;
