import pb from '@/api/pocketbase';
import { useContent } from '@/contexts/Content';
import { useContentData, useStorageData } from '@/hooks';

function useCreateComment(setOpenModal) {
  const storageData = useStorageData();
  const { selectedComment } = useContent();
  const { refetch, data } = useContentData();
  const handleSubmitComment = async (e, collection, ref) => {
    e.preventDefault();

    if (!ref.current.value) {
      alert(`${collection === 'comments' ? '댓글' : '답글'}을 입력해주세요.`);
      return;
    }
    const defaultPlaceholder = ref.current.placeholder;
    const commentId = crypto.randomUUID().replaceAll('-', '').slice(0, 15);

    await pb
      .collection(collection === 'comments' ? 'comments' : 'reply')
      .create({
        id: commentId,
        comment: ref.current.value,
        commenter: storageData.id,
      });

    ref.current.value = '';
    ref.current.style.backgroundColor = '#d9d9d9';
    ref.current.placeholder = `${
      collection === 'comments' ? '댓글' : '답글'
    }을 입력 중입니다...`;
    ref.current.disabled = true;

    collection === 'comments'
      ? (document.querySelector('#submitButton').disabled = true)
      : (document.querySelector('#dialog__submitButton').disabled = true);

    (collection === 'comments' ? data.comments : selectedComment.reply)?.push(
      commentId
    );

    await pb
      .collection(collection === 'comments' ? 'feeds' : 'comments')
      .update(
        collection === 'comments' ? data?.id : selectedComment?.id,
        collection === 'comments'
          ? { comments: data.comments }
          : { reply: selectedComment?.reply }
      );

    if (collection === 'comments') {
      ref.current.style.height = '40px';
      ref.current.style.transform = 'translateY(0px)';
      ref.current.style.marginTop = '0px';
    }

    await refetch();

    ref.current.style.backgroundColor = 'white';
    ref.current.placeholder = defaultPlaceholder;
    ref.current.disabled = false;

    if (collection === 'reply') {
      setOpenModal(false);
      document.querySelector('#dialog__submitButton').disabled = false;
    } else {
      document.querySelector('#submitButton').disabled = false;
    }

    return;
  };

  return { handleSubmitComment };
}

export default useCreateComment;
