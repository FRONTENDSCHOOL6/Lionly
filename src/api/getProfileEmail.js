import pb from './pocketbase';

async function getProfileEmail(userId) {
  const userData = await pb.collection('users').getOne('6onsajcamfqzzjg');
  const profileEmail = userData.email;

  return profileEmail;
}

export default getProfileEmail;
