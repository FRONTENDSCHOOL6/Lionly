import pb from './pocketbase';

async function getProfileImageURL(userId) {
  const userData = await pb
    .collection('users')
    .getOne(
      '6onsajcamfqzzjg' /* 이 부분에 로그인 된 user의 id를 넣어줍니다. */
    );
  const profileImageURL = `${import.meta.env.VITE_PB_API}/files/users/${
    userData.id
  }/${userData.profile_image}`;

  return profileImageURL;
}

export default getProfileImageURL;
