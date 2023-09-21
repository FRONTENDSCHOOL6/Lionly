import { node, string } from 'prop-types';
import { createContext, useState } from 'react';

export const ContentContext = createContext({});

function ContentProvider({ displayName = 'ContentContext', children }) {
  const [selectedComment, setSelectedComment] = useState({});
  const [contentData, setContentData] = useState({});

  return (
    <ContentContext.Provider
      displayName={displayName}
      value={{
        contentData,
        setContentData,
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
