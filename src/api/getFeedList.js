import pb from './pocketbase';

async function getFeedList(pageParam, channelName) {
  const feedList = await pb.collection('feeds').getList(pageParam, 2, {
    expand: 'author',
    filter: `${
      channelName ? `channels = "${channelName}"` : "channels ~ '방'"
    }`,
  });

  return feedList;
}

export default getFeedList;
