import useStorageData from '@/hooks/useStorageData';
import { shape, string } from 'prop-types';
import { ReactComponent as DeleteSVG } from '@/assets/delete_Feed.svg';
import { ReactComponent as LionLogoSVG } from '@/assets/lionLogo_common.svg';
import { useRef, useState } from 'react';
import renderImg from '@/utils/getImageData';
import pb from '@/api/pocketbase';
import toast from 'react-hot-toast';

function ProfileEdit({ onClose }) {
  const { profile_image, id } = useStorageData();

  const [profileImage, setProfileImage] = useState();
  const profileImageFile = useRef(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [changeNickName, setChangeNickName] = useState(null);

  function handleButtonClick() {
    profileImageFile.current.click();
  }

  function handleFileUpload(e) {
    const renderFile = e.target.files[0];
    setUploadImage(renderFile);
    if (renderFile) {
      setProfileImage(URL.createObjectURL(renderFile));
    }
  }

  function handleNickName(e) {
    const nickName = e.target.value;
    setChangeNickName(nickName);
    console.log(changeNickName);
  }
  async function handleUpdate() {
    if (id && profileImage && changeNickName) {
      await pb.collection('users').update(id, {
        profile_image: uploadImage,
        nickname: changeNickName,
      });
      toast('변경되었습니다!');
    }
  }

  return (
    <div
      className="fixed left-0 top-0 z-20 h-full w-full bg-slate-400/70
   "
      onClick={onClose}
    >
      <div
        className="absolute  left-1/2 top-1/2 z-50
        mx-auto h-[320px]
      w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-lionly-white pt-1  "
      >
        <button type="button" onClick={onClose}>
          <DeleteSVG className="absolute right-4" />
        </button>
        <div className="flex flex-col items-center gap-2">
          <button
            className="mt-5 h-[70px] w-[70px]"
            onClick={() => handleButtonClick()}
          >
            <img
              src={profileImage || renderImg('users', id, profile_image)}
              alt=""
              className="
          h-full w-full
        rounded-full border-2 border-lionly-gray-4 bg-cover bg-no-repeat shadow-lg"
            />
            {/* <ProfileImage handleInputClick={[id, profile_image]} /> */}
          </button>
          {/* 프로필 이미지 변경 */}

          <input
            className="hidden"
            type="file"
            ref={profileImageFile}
            onChange={handleFileUpload}
          />
          {/* 닉네임 변경 */}
          <label htmlFor="nickname"></label>
          <input
            id="nickname"
            type="text"
            label="닉네임"
            name="nickname"
            placeholder="변경할 닉네임을 입력하세요."
            className="h-9 w-52 gap-2 rounded-lg border bg-lionly-gray-4 px-3 py-3 text-center text-lionly-sm  outline-none  placeholder:text-lionly-gray-2"
            minLength="3"
            maxLength="8"
            onChange={handleNickName}
          />
          <button
            className="h-9 w-52 rounded-lg bg-lionly-primary-color px-2 py-2 text-lionly-md text-lionly-white"
            type="submit"
            onClick={() => {
              handleUpdate();
            }}
          >
            변경하기
          </button>
        </div>
        <LionLogoSVG className="absolute bottom-0 right-4 h-16 w-14" />
      </div>
    </div>
  );
}

ProfileEdit.propTypes = {
  item: shape({
    id: string,
    profile_image: string,
  }),
};
export default ProfileEdit;
