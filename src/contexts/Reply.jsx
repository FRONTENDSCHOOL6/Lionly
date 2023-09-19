import { node, string } from 'prop-types';
import { createContext, useState } from 'react';

export const ReplyContext = createContext({});

function ReplyProvider({ displayName = 'ReplyContext', children }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ReplyContext.Provider
      displayName={displayName}
      value={{
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </ReplyContext.Provider>
  );
}

ReplyProvider.propTypes = {
  displayName: string,
  children: node,
};

export default ReplyProvider;
