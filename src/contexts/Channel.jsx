import { node, string } from 'prop-types';
import { createContext, useEffect, useState } from 'react';

export const ChannelContext = createContext({});

function ChannelProvider({ displayName = 'ChannelContext', children }) {
  const initialState = {
    '전체 게시글': false,
    일상방: false,
    맛집방: false,
    취업방: false,
    힐링방: false,
  };
  const [channelList, setChannelList] = useState(initialState);

  const pathname = window.location.pathname;
  useEffect(() => {
    switch (pathname) {
      case '/feed':
        setChannelList(() => ({
          ...initialState,
          '전체 게시글': true,
        }));
        break;

      case '/feed/dailys':
        setChannelList(() => ({
          ...initialState,
          일상방: true,
        }));
        break;

      case '/feed/foods':
        setChannelList(() => ({
          ...initialState,
          맛집방: true,
        }));
        break;

      case '/feed/jobs':
        setChannelList(() => ({
          ...initialState,
          취업방: true,
        }));
        break;

      case '/feed/healings':
        setChannelList(() => ({
          ...initialState,
          힐링방: true,
        }));
        break;
    }
  }, [pathname]);

  // const [setMakeRender] = useState(null);
  const handleChangeChannel = (e) => {
    setChannelList(() => ({
      ...initialState,
    }));
  };

  return (
    <ChannelContext.Provider
      value={{
        channelList,
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
