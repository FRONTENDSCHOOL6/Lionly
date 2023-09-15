import pb from './pocketbase'

function createFeedData(data) {
  return pb.collection('feeds').create(data);
}
export default createFeedData;