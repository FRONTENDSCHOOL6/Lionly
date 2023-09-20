import { node, string } from 'prop-types';
import { createContext, useState } from 'react';

export const ContentContext = createContext({});

function ContentProvider({ displayName = 'ContentContext', children }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});

  return (
    <ContentContext.Provider
      displayName={displayName}
      value={{
        openModal,
        setOpenModal,
        selectedComment,
        setSelectedComment,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

ContentProvider.propTypes = {
  displayName: string,
  children: node,
};

export default ContentProvider;
