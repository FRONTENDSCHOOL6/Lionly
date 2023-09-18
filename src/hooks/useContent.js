import getFeed from '@/api/getFeed';
import { useQuery } from '@tanstack/react-query';
import useChannel from './useChannel';

function useContent(contentId) {
  const { isLoading, data } = useQuery({
    queryKey: ['content', window.location.pathname],
    queryFn: () => getFeed(contentId),
    // select: (content) => {
    //   return {
    //     collectionId: content.collectionId,
    //     id: content.id,
    //     feed_image: content.feed_image,
    //     text: content.text,
    //     created: content.created,

    //     author: {
    //       collectionId: content.expand.author.collectionId,
    //       id: content.expand.author.id,
    //       nickname: content.expand.author.nickname,
    //       profile_image: content.expand.author.profile_image,
    //     },

    //     comments: content.expand.comments?.map((commentData) => {
    //       return {
    //         collectionId: commentData.id,
    //         comment: commentData.comment,
    //         created: commentData.created,
    //         commenter: {
    //           collectionId: commentData.expand.commenter.collectionId,
    //           id: commentData.expand.commenter.id,
    //           nickname: commentData.expand.commenter.nickname,
    //           profile_image: commentData.expand.commenter.profile_image,
    //         },
    //       };
    //     }),
    //   };
    // },
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
