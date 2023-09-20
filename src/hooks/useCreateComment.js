import createComment from '@/api/createComment';
import updateComment from '@/api/updateComment';
import { useReply } from '@/hooks';
import { useRef } from 'react';
import useStorageData from './useStorageData';

function useCreateComment(data) {
  const storageData = useStorageData();
  const commentInputRef = useRef(null);
  const replyInputRef = useRef(null);
  const commentArray = data.comments;
  const { setOpenModal, selectedComment } = useReply();

  const handleSubmitComment = async (e, collection) => {
    e.preventDefault();

    if (
      !(collection === 'comments' ? commentInputRef : replyInputRef).current
        .value
    ) {
      alert(`${collection === 'comments' ? '댓글' : '답글'}을 입력해주세요.`);

      return;
    }

    const commentId = crypto.randomUUID().replaceAll('-', '').slice(0, 15);

    await createComment(collection === 'comments' ? 'comments' : 'reply', {
      id: commentId,
      comment: (collection === 'comments' ? commentInputRef : replyInputRef)
        .current?.value,
      commenter: storageData?.id,
    });

    (collection === 'comments' ? commentArray : selectedComment.reply)?.push(
      commentId
    );

    await updateComment(
      collection === 'comments' ? 'feeds' : 'comments',
      collection === 'comments' ? data?.id : selectedComment?.id,
      collection === 'comments'
        ? { comments: commentArray }
        : { reply: selectedComment?.reply }
    );

    (collection === 'comments'
      ? commentInputRef
      : replyInputRef
    ).current.value = '';

    collection === 'comments' ? null : setOpenModal(false);

    return;
  };

  return { commentInputRef, replyInputRef, handleSubmitComment };
}

export default useCreateComment;
