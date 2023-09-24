import { node, string } from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

export const ChannelContext = createContext({});

function ChannelProvider({ displayName = 'ChannelContext', children }) {
  const allFalseState = {
    '전체 게시글': false,
    일상방: false,
    맛집방: false,
    취업방: false,
    힐링방: false,
  };
  const initialState = {
    '전체 게시글': true,
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
          ...allFalseState,
          '전체 게시글': true,
        }));
        break;

      case '/feed/daily':
        setChannelList(() => ({
          ...allFalseState,
          일상방: true,
        }));
        break;

      case '/feed/food':
        setChannelList(() => ({
          ...allFalseState,
          맛집방: true,
        }));
        break;

      case '/feed/job':
        setChannelList(() => ({
          ...allFalseState,
          취업방: true,
        }));
        break;

      case '/feed/healing':
        setChannelList(() => ({
          ...allFalseState,
          힐링방: true,
        }));
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleChangeChannel = (e) => {
    const target = e.target.textContent;

    if (!channelList[target]) {
      scrollTo({
        top: 0,
      });
      setChannelList(() => ({
        ...allFalseState,
        [target]: true,
      }));
    }
  };

  return (
    <ChannelContext.Provider
      value={{
        initialState,
        channelList,
        setChannelList,
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

export function useChannel() {
  const value = useContext(ChannelContext);

  if (value === undefined) {
    throw new Error(
      'useChannel Hook은 ChannelProvider 안에서 사용되어야 합니다.'
    );
  }

  return value;
}
