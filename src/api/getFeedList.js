import pb from './pocketbase';

async function getFeedList() {
  try {
    const getFeedList = await pb
      .collection('feeds')
      .getFullList({ expand: 'author' });
    console.log(getFeedList);
    return getFeedList;
  } catch (error) {
    console.log(error);
  }
}

export default getFeedList;
