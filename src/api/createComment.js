import pb from './pocketbase';

async function createComment(commentData = {}) {
  await pb.collection('comments').create(commentData);

  return;
}

export default createComment;
