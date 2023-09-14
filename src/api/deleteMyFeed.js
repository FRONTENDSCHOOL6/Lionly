import pb from './pocketbase';

async function deleteMyFeed() {
  const MyFeedItem = await pb.collection('feeds').delete();
  return MyFeedItem;
}
export default deleteMyFeed;
