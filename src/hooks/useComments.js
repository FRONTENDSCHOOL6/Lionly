import createComment from '@/api/createComment';
import updateComment from '@/api/updateComment';
import { useRef, useState } from 'react';
import useStorageData from './useStorageData';
import { useReply } from '@/hooks';

function useComments(data) {
  const commentInputRef = useRef(null);
  const storageData = useStorageData();
  const commentArray = data.comments;

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!commentInputRef.current.value) {
      alert('댓글을 입력해주세요.');

      return;
    }

    const commentId = crypto.randomUUID().replaceAll('-', '').slice(0, 15);

    await createComment('comments', {
      id: commentId,
      comment: commentInputRef.current?.value,
      commenter: storageData.id,
    });

    commentArray?.push(commentId);

    await updateComment('feeds', data.id, { comments: commentArray });

    commentInputRef.current.value = '';

    return;
  };

  const replyInputRef = useRef(null);
  const { setOpenModal, selectedComment } = useReply();

  const handleSubmitReply = async (e) => {
    e.preventDefault();

    if (!replyInputRef.current.value) {
      alert('답글을 입력해주세요.');

      return;
    }

    const replyId = crypto.randomUUID().replaceAll('-', '').slice(0, 15);

    await createComment('reply', {
      id: replyId,
      comment: replyInputRef.current?.value,
      commenter: storageData.id,
    });

    selectedComment.reply?.push(replyId);

    await updateComment('comments', selectedComment.id, {
      reply: selectedComment.reply,
    });

    replyInputRef.current.value = '';
    setOpenModal(false);

    return;
  };

  const [comments, setComments] = useState(data.expand.comments);
  return {
    commentInputRef,
    replyInputRef,
    storageData,
    handleSubmitComment,
    handleSubmitReply,
    comments,
    setComments,
  };
}

export default useComments;
