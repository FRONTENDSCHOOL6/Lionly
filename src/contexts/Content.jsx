import { node, string } from 'prop-types';
import { createContext, useState } from 'react';

export const ContentContext = createContext({});

function ContentProvider({ displayName = 'ContentContext', children }) {
  const [content, setContent] = useState({});
  const [selectedComment, setSelectedComment] = useState({});
  // const start = performance.now();
  // console.log('시작');

  // const end = performance.now();
  // console.log('끝');
  // console.log(`${end - start}`);
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
