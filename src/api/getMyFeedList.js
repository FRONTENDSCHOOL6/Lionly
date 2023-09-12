import pb from './pocketbase';

async function getMyFeedList(key) {
  const getMyFeedList = await pb.collection('feeds').getFullList({
    expand: 'author',
    filter: `author = "${key}"`,
  });

  return getMyFeedList;
}

export default getMyFeedList;
