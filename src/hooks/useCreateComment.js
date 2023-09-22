import createComment from '@/api/createComment';
import updateComment from '@/api/updateComment';
import { useContent, useContentData } from '@/hooks';
import useStorageData from './useStorageData';

function useCreateComment() {
  const storageData = useStorageData();
  const { content, selectedComment } = useContent();
  const { refetch } = useContentData();

  const handleSubmitComment = async (e, collection, ref) => {
    e.preventDefault();

    const commentId = crypto.randomUUID().replaceAll('-', '').slice(0, 15);

    if (!ref.current.value) {
      alert(`${collection === 'comments' ? '댓글' : '답글'}을 입력해주세요.`);
      return;
    }

    await createComment(collection === 'comments' ? 'comments' : 'reply', {
      id: commentId,
      comment: ref.current.value,
      commenter: storageData.id,
    });
    ref.current.value = '';

    (collection === 'comments'
      ? content.commentArray
      : selectedComment.reply
    )?.push(commentId);

    await updateComment(
      collection === 'comments' ? 'feeds' : 'comments',
      collection === 'comments' ? content?.id : selectedComment?.id,
      collection === 'comments'
        ? { comments: content.commentArray }
        : { reply: selectedComment?.reply }
    );

    if (collection === 'comments') {
      ref.current.style.height = '40px';
      ref.current.style.transform = 'translateY(0px)';
      ref.current.style.marginTop = '0px';
    }

    await refetch();

    return;
  };

  return { handleSubmitComment };
}

export default useCreateComment;
