import pb from './pocketbase';

async function createUserInfo(data) {
  const userInfo = await pb.collection('users').create(data);
  return userInfo;
}
export default createUserInfo;