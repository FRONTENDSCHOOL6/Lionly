import pb from './pocketbase';

async function updateComment(feedId, newFeedData = {}) {
  await pb.collection('feeds').update(feedId, newFeedData);

  return;
}

export default updateComment;
