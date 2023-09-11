import pb from './pocketbase';

async function getProfileNickname(userId) {
  const userData = await pb.collection('users').getOne('6onsajcamfqzzjg');
  const profileNickname = userData.nickname;

  return profileNickname;
}

export default getProfileNickname;
