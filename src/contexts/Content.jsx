import { node, string } from 'prop-types';
import { createContext, useState } from 'react';

export const ContentContext = createContext({});

function ContentProvider({ displayName = 'ContentContext', children }) {
  const [content, setContent] = useState({});
  const [selectedComment, setSelectedComment] = useState({});

  return (
    <ContentContext.Provider
      displayName={displayName}
      value={{
        content,
        setContent,
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
