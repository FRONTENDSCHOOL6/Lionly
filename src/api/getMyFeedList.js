import pb from './pocketbase';

async function getMyFeedList(pageParam) {
  const getMyFeedList = await pb.collection('feeds').getList(pageParam, 2, {
    expand: 'author, comments.reply',
    filter: `author = "${pb.authStore.model?.id}"`,
    sort: '-created',
  });

  return getMyFeedList;
}

export default getMyFeedList;
