import createComment from '@/api/createComment';
import updateComment from '@/api/updateComment';
import { useRef, useState } from 'react';
import useStorageData from './useStorageData';
import { useReply } from '@/hooks';
import pb from '@/api/pocketbase';

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
  const { openModal, setOpenModal } = useReply();
  const [selectedComment, setSelectedComment] = useState({});

  const handleOpenModal = (e, commentId) => {
    if (openModal === false) {
      if (e.key === 'Enter' || e.type === 'click') {
        setOpenModal(true);
      }
      scrollTo({ top: 100000, behavior: 'smooth' });

      (async () => {
        const commentData = await pb.collection('comments').getOne(commentId, {
          expand: 'commenter, reply',
        });

        setSelectedComment({
          id: commentData.id,
          nickname: commentData.expand.commenter.nickname,
          reply: commentData.reply,
        });
      })();

      return;
    }
  };
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

  const handleDeleteComment = async (collection, recordId) => {
    if (
      confirm(
        `${collection === 'comments' ? '댓글' : '답글'}을 삭제하시겠습니까?`
      )
    ) {
      await pb.collection(collection).delete(recordId);
    }
  };

  const [comments, setComments] = useState(data.expand.comments);
  return {
    commentInputRef,
    replyInputRef,
    storageData,
    handleSubmitComment,
    handleSubmitReply,
    handleDeleteComment,
    comments,
    setComments,
    handleOpenModal,
  };
}

export default useComments;
