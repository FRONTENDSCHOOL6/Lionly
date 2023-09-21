import pb from '@/api/pocketbase';
import useContent from './useContent';

function useDeleteComment() {
  const { contentData } = useContent();

  const handleDeleteComment = async (collection, recordId) => {
    if (
      confirm(
        `${collection === 'comments' ? '댓글' : '답글'}을 삭제하시겠습니까?`
      )
    ) {
      await pb.collection(collection).delete(recordId);
      const commentData = contentData.expand.comments?.filter(
        (comment) => comment.id === recordId
      );
      if (commentData[0]?.reply.length > 0)
        commentData[0].reply.forEach(
          async (reply) => await pb.collection('reply').delete(reply)
        );
      return;
    }
    return;
  };
  return { handleDeleteComment };
}

export default useDeleteComment;
