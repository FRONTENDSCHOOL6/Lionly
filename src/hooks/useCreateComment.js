import pb from '@/api/pocketbase';
import { useContent } from '@/contexts/Content';
import { useContentData, useStorageData } from '@/hooks';

function useCreateComment() {
  const storageData = useStorageData();
  const { selectedComment } = useContent();
  const { refetch, data } = useContentData();

  const handleSubmitComment = async (e, collection, ref) => {
    e.preventDefault();

    if (!ref.current.value) {
      alert(`${collection === 'comments' ? '댓글' : '답글'}을 입력해주세요.`);
      return;
    }

    const commentId = crypto.randomUUID().replaceAll('-', '').slice(0, 15);

    await pb
      .collection(collection === 'comments' ? 'comments' : 'reply')
      .create({
        id: commentId,
        comment: ref.current.value,
        commenter: storageData.id,
      });

    ref.current.value = '';

    (collection === 'comments'
      ? data[0].commentArray
      : selectedComment.reply
    )?.push(commentId);

    await pb
      .collection(collection === 'comments' ? 'feeds' : 'comments')
      .update(
        collection === 'comments' ? data[0]?.id : selectedComment?.id,
        collection === 'comments'
          ? { comments: data[0].commentArray }
          : { reply: selectedComment?.reply }
      );

    if (collection === 'comments') {
      ref.current.style.height = '40px';
      ref.current.style.transform = 'translateY(0px)';
      ref.current.style.marginTop = '0px';
    }

    await refetch();
    scrollTo({
      top: 100000,
    });
    return;
  };

  return { handleSubmitComment };
}

export default useCreateComment;
