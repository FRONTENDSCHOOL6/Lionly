import pb from './pocketbase';

async function updateComment(collection, feedId, newFeedData = {}) {
  await pb.collection(collection).update(feedId, newFeedData);

  return;
}

export default updateComment;
