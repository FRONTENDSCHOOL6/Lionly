import pb from './pocketbase';

async function createComment(collection, commentData = {}) {
  await pb.collection(collection).create(commentData);

  return;
}

export default createComment;
