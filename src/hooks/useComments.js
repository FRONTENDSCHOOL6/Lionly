import createComment from '@/api/createComment';
import updateComment from '@/api/updateComment';
import { useRef, useState } from 'react';
import useStorageData from './useStorageData';

function useComments(data) {
  const commentInputRef = useRef(null);
  const storageData = useStorageData();
  const commentArray =
    data.expand.comments?.map((item) => item.id) || Array(1).fill(null);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!commentInputRef.current.value) {
      alert('댓글을 입력해주세요.');
    }

    const commentId = crypto.randomUUID().replaceAll('-', '').slice(0, 15);

    await createComment({
      id: commentId,
      comment: commentInputRef.current?.value,
      commenter: storageData.id,
    });

    commentArray?.push(commentId);
    await updateComment(data.id, { comments: commentArray });

    commentInputRef.current.value = '';

    return;
  };

  const [comments, setComments] = useState(data.expand.comments);
  return {
    commentInputRef,
    storageData,
    handleSubmitComment,
    comments,
    setComments,
  };
}

export default useComments;
