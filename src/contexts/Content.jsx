import { node, string } from 'prop-types';
import { createContext, useContext, useState } from 'react';

export const ContentContext = createContext({});

function ContentProvider({ displayName = 'ContentContext', children }) {
  const [selectedComment, setSelectedComment] = useState({});

  return (
    <ContentContext.Provider
      displayName={displayName}
      value={{
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

export function useContent() {
  const value = useContext(ContentContext);

  if (value === undefined) {
    throw new Error(
      'useContent Hook은 ContentProvider 안에서 사용되어야 합니다.'
    );
  }

  return value;
}
