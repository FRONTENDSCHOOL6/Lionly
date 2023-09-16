import getFeed from '@/api/getFeed';
import { useQuery } from '@tanstack/react-query';
import useChannel from './useChannel';

function useContent(contentId) {
  const { isLoading, data } = useQuery({
    queryKey: ['content', window.location.pathname],
    queryFn: () => getFeed(contentId),
    select: (content) => {
      return {
        collectionId: content.collectionId,
        id: content.id,
        author: {
          collectionId: content.expand.author.collectionId,
          id: content.expand.author.id,
          nickname: content.expand.author.nickname,
          profileImage: content.expand.author.profile_image,
        },
        feedImage: content.feed_image,
        text: content.text,
        createdTime: content.created,
        comments: content.expand.comments?.map((commentData) => {
          return {
            collectionId: commentData.id,
            commenter: {
              collectionId: commentData.expand.commenter.collectionId,
              id: commentData.expand.commenter.id,
              nickname: commentData.expand.commenter.nickname,
              profileImage: commentData.expand.commenter.profile_image,
            },
            comment: commentData.comment,
            createdTime: commentData.created,
          };
        }),
      };
    },
  });

  const { channelList } = useChannel();
  const selectedChannelIndex = Object.values(channelList).indexOf(true);
  const selectedChannel = Object.keys(channelList)[selectedChannelIndex];
  let pathname;

  switch (selectedChannel) {
    case '전체 게시글':
      pathname = '/feed';
      break;
    case '일상방':
      pathname = '/feed/dailys';
      break;
    case '맛집방':
      pathname = '/feed/foods';
      break;
    case '취업방':
      pathname = '/feed/jobs';
      break;
    case '힐링방':
      pathname = '/feed/healings';
      break;
  }

  return { isLoading, data, pathname };
}

export default useContent;
