import pb from './pocketbase';

function createUserInfo(data) {
  return pb.collection('users').create(data);
}
export default createUserInfo;