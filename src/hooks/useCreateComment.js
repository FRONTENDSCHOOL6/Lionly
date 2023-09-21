import createComment from '@/api/createComment';
import updateComment from '@/api/updateComment';
import { useContent } from '@/hooks';
import { useRef } from 'react';
import useStorageData from './useStorageData';

function useCreateComment() {
  const storageData = useStorageData();
  const commentInputRef = useRef(null);
  const replyInputRef = useRef(null);
  const { contentData, selectedComment } = useContent();
  const commentArray = contentData?.comments;

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
      commenter: storageData.id,
    });

    (collection === 'comments' ? commentArray : selectedComment.reply)?.push(
      commentId
    );
    console.log(commentArray);
    await updateComment(
      collection === 'comments' ? 'feeds' : 'comments',
      collection === 'comments' ? contentData?.id : selectedComment?.id,
      collection === 'comments'
        ? { comments: commentArray }
        : { reply: selectedComment?.reply }
    );
    (collection === 'comments'
      ? commentInputRef
      : replyInputRef
    ).current.value = '';

    if (collection === 'comments') {
      commentInputRef.current.style.height = '40px';
      commentInputRef.current.style.transform = 'translateY(0px)';
      commentInputRef.current.style.marginTop = '0px';
    }

    return;
  };

  return { commentInputRef, replyInputRef, handleSubmitComment };
}

export default useCreateComment;
