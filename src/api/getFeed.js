import pb from '@/api/pocketbase';

async function getFeed(feedId) {
  const feed = await pb.collection('feeds').getOne(`${feedId}`, {
    expand: 'author,comments',
  });

  return feed;
}

export default getFeed;
