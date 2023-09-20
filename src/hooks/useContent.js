import { ContentContext } from '@/contexts/Content';
import { useContext } from 'react';

function useContent() {
  const value = useContext(ContentContext);

  if (value === undefined) {
    throw new Error(
      'useContent Hook은 ContentProvider 안에서 사용되어야 합니다.'
    );
  }

  return value;
}

export default useContent;
