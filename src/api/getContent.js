import pb from '@/api/pocketbase';

async function getContent(feedId) {
  const feed = await pb.collection('feeds').getOne(`${feedId}`, {
    expand: 'author, comments, comments.commenter',
  });

  return feed;
}

export default getContent;
