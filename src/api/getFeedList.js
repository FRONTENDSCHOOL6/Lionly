import pb from './pocketbase';

async function getFeedList(pageParam) {
  const feedList = await pb.collection('feeds').getList(pageParam, 3, {
    expand: 'author',
  });

  return feedList;
}

export default getFeedList;
