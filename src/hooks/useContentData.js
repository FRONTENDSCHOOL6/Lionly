import getContent from '@/api/getContent';
import { useQuery } from '@tanstack/react-query';
import useContent from './useContent';

function useContentData(contentId) {
  const { setContent, setComments } = useContent();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['content', contentId],
    queryFn: () => getContent(contentId),
    select: (data) => {
      return [
        {
          collectionId: data.collectionId,
          id: data.id,
          created: data.created,
          updated: data.updated,

          authorId: data.author,
          authorNickname: data.expand.author.nickname,
          authorProfileImage: data.expand.author.profile_image,

          channel: data.channels,
          feedImage: data.feed_image,
          text: data.text,

          commentArray: data.comments,
        },
        data.expand.comments,
      ];
    },

    onSuccess: (data) => {
      setContent(data[0]);
      setComments(data[1]);
    },
  });

  return { isLoading, data, refetch };
}

export default useContentData;
