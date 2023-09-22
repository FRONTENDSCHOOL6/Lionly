import pb from './pocketbase';

async function getFeedList(pageParam, channelName) {
  const feedList = await pb.collection('feeds').getList(pageParam, 4, {
    expand: 'author, comments.reply',
    filter: `${
      channelName ? `channels = "${channelName}"` : "channels ~ '방'"
    }`,
    sort: '-created',
  });

  return feedList;
}

export default getFeedList;
