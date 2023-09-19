import pb from '@/api/pocketbase';

function useDeleteComment() {
  const handleDeleteComment = async (collection, recordId) => {
    if (
      confirm(
        `${collection === 'comments' ? '댓글' : '답글'}을 삭제하시겠습니까?`
      )
    ) {
      await pb.collection(collection).delete(recordId);
    }
  };

  return { handleDeleteComment };
}

export default useDeleteComment;
