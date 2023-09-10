import pb from './pocketbase';

async function getProfileImageURL(userId) {
  const userData = await pb
    .collection('users')
    .getOne(userId /* 이 부분에 로그인 된 user의 id를 넣어줍니다. */);
  const profileImageId = userData.id;
  const profileImageName = userData.profile_image;

  return { profileImageId, profileImageName };
}

export default getProfileImageURL;
