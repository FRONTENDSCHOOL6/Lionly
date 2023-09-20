import getContent from '@/api/getContent';
import pb from '@/api/pocketbase';
import { useModal } from '@/hooks';

function useSubscribe() {
  const { comments, setComments } = useModal();

  async function subscribeComment(collection) {
    await pb
      .collection(collection)
      .subscribe('*', async ({ action, record }) => {
        if (action === 'update') {
          console.log(record);
          const content = await getContent(record.id);
          setComments(content.expand.comments);
        }

        scrollTo({
          top: 1000000,
          behavior: 'smooth',
        });
      });
  }

  return { comments, subscribeComment };
}

export default useSubscribe;
