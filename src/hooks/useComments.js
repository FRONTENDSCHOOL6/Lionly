import createComment from '@/api/createComment';
import updateComment from '@/api/updateComment';
import { useRef, useState } from 'react';
import useStorageData from './useStorageData';

function useComments(data) {
  const commentId = crypto.randomUUID().replaceAll('-', '').slice(0, 15);
  const commentInputRef = useRef(null);
  const storageData = useStorageData();
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    await createComment({
      id: commentId,
      comment: commentInputRef.current?.value,
      commenter: storageData.id,
    });

    const commentArray = data.expand.comments?.map((item) => item.id);
    commentArray?.push(commentId);
    await updateComment(data.id, { comments: commentArray });
  };

  const [comments, setComments] = useState(data.expand.comments);
  return {
    storageData,
    commentId,
    commentInputRef,
    handleSubmitComment,
    comments,
    setComments,
  };
}

export default useComments;
