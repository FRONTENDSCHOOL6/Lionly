import toast from 'react-hot-toast';
import pb from './pocketbase';

async function deleteMyFeed(item, id, commentArray) {
  const deleteFeed = window.confirm(
    '삭제된 글은 복구하실 수 없습니다. 삭제하시겠습니까?'
  );
  if (deleteFeed) {
    await pb.collection('feeds').delete(`${id}`);
    for (let i = 0; i < commentArray.length; i++) {
      const reply = item.expand.comments[i].reply;
      await pb.collection('comments').delete(commentArray[i]);
      for (let j = 0; j < reply.length; j++) {
        await pb.collection('reply').delete(reply[j]);
      }
    }
    toast('삭제되었습니다');
    location.reload();
  }
  // console.log(item.expand.comments[0].reply);
  console.log(commentArray);

  return deleteFeed;
}
export default deleteMyFeed;
