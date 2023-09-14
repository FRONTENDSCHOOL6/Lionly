import pb from './pocketbase'

async function createFeedData(data) {
  const feedData = await pb.collection('feeds').create(data);
  return feedData;
}
export default createFeedData;