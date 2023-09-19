import { ReplyContext } from '@/contexts/Reply';
import { useContext } from 'react';

function useReply() {
  const value = useContext(ReplyContext);

  if (value === undefined) {
    throw new Error('useReply Hook은 ReplyProvider 안에서 사용되어야 합니다.');
  }

  return value;
}

export default useReply;
