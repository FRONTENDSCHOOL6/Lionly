import pb from './pocketbase';

async function getFeedText() {
  const feedListText = await pb.collection('feeds').getFullList({
    fields: 'text'
  });
  return feedListText;
}
export default getFeedText;







