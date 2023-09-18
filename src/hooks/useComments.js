import createComment from '@/api/createComment';
import updateComment from '@/api/updateComment';
import { useRef, useState } from 'react';
import useStorageData from './useStorageData';

function useComments(data) {
  const { id } = useStorageData();
  const commentInputRef = useRef(null);
  const commentId = crypto.randomUUID().replaceAll('-', '').slice(0, 15);
  const [comments, setComments] = useState(data.expand.comments);
  const commentArray = data.expand.comments?.map((item) => item.collectionId);
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    await createComment({
      id: commentId,
      comment: commentInputRef.current?.value,
      commenter: id,
    });

    commentArray?.push(commentId);
    await updateComment(data.id, { comments: commentArray });
  };

  return {
    commentId,
    commentInputRef,
    handleSubmitComment,
    comments,
    setComments,
  };
}

export default useComments;
