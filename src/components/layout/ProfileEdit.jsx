import pb from '@/api/pocketbase';
import { ReactComponent as DeleteSVG } from '@/assets/delete_Feed.svg';
import lionHeadLogo from '@/assets/lionHeadLogo_common.svg';
import { ReactComponent as LionLogoSVG } from '@/assets/lionLogo_common.svg';
import { useStorageData } from '@/hooks';
import { handlePreventTabControl, nickNameReg, renderImg } from '@/utils';
import { readAndCompressImage } from 'browser-image-resizer';
import { func } from 'prop-types';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import FormInput from '../input/FormInput';

function ProfileEdit({ onClose }) {
  const { profile_image, id, nickname } = useStorageData();
  const [profileImage, setProfileImage] = useState();
  const profileImageFile = useRef(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [changeNickName, setChangeNickName] = useState(null);
  const config = {
    quality: 0.5,
    maxWidth: 1000,
    maxHeight: 1000,
  };

  function handleButtonClick() {
    profileImageFile.current.click();
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0];

    if (file) {
      try {
        // 이미지 리사이징 및 압축
        const optimizedImage = await readAndCompressImage(file, config);

        // 선택된 이미지의 URL 생성
        setProfileImage(URL.createObjectURL(optimizedImage));

        // 최적화된 이미지 파일 저장
        setUploadImage(optimizedImage);
      } catch (err) {
        console.error('Failed to optimize image', err);
      }
    }
    // setUploadImage(renderFile);
    // if (renderFile) {
    //   setProfileImage(URL.createObjectURL(renderFile));
    // }
  }

  function handleNickName(e) {
    const nickName = e.target.value;
    setChangeNickName(nickName);
    // console.log(changeNickName);
  }

  async function handleUpdate() {
    try {
      if (!uploadImage && (changeNickName === '' || changeNickName == null)) {
        toast.error('변경할 닉네임을 입력해주세요.', { icon: '⚠️' });
        return;
      }

      if (uploadImage && !changeNickName) {
        await pb.collection('users').update(id, {
          profile_image: uploadImage,
        });
        toast.success('변경되었습니다.');
        location.reload();
        return;
      }

      if (!nickNameReg(changeNickName)) {
        toast.error('닉네임 형식이 올바르지 않습니다.');
        return;
      }

      if (!uploadImage && changeNickName) {
        await pb.collection('users').update(id, {
          nickname: changeNickName,
        });
      } else {
        await pb.collection('users').update(id, {
          profile_image: uploadImage,
          nickname: changeNickName,
        });
      }

      toast.success('변경되었습니다!');
      location.reload();
    } catch (error) {
      if (error.response.code === 400) {
        const { nickname } = error.response.data;

        if (nickname && nickname.message.includes('unique')) {
          toast.error('닉네임이 중복됩니다.');
        }
      }
    }
  }

  return (
    <div className="fixed left-0 top-0 z-20 h-full w-full bg-gray-800/40">
      <div
        role="dialog"
        aria-labelledby="ProfileEdit"
        aria-modal="true"
        className="absolute left-1/2 top-1/2 z-50
        mx-auto h-[320px]
      w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-lionly-white pt-1"
      >
        <h3 className="sr-only " id="ProfileEdit">
          프로필 편집
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="ml-[258px]"
          aria-label="닫기"
        >
          <DeleteSVG />
        </button>
        <div className="relative flex flex-col items-center gap-2">
          <button
            className="mt-5 h-[70px] w-[70px] "
            onClick={() => handleButtonClick()}
          >
            {profile_image ? (
              <img
                src={profileImage || renderImg('users', id, profile_image)}
                alt="프로필 이미지"
                className="
          h-full w-full
        rounded-full border-2 border-lionly-gray-4 bg-cover bg-no-repeat shadow-lg  "
              />
            ) : (
              <img
                src={profileImage || lionHeadLogo}
                alt="프로필 이미지"
                className="
          h-full w-full
        rounded-full border-2 border-lionly-gray-4 bg-cover bg-no-repeat shadow-lg  "
              />
            )}
          </button>
          <form>
            <label htmlFor="profileImage"></label>
            <input
              type="file"
              id="profileImage"
              accept=".jpg,.png"
              className="hidden"
              ref={profileImageFile}
              onChange={handleFileUpload}
            />

            <FormInput
              type="text"
              label="닉네임"
              name="usernickname"
              placeholder={nickname}
              errorMessage="한글 3~8자로 입력해주세요."
              className="h-9 w-52 gap-2 rounded-lg border bg-lionly-gray-4 px-3 py-3 text-center text-lionly-base  outline-none  placeholder:text-lionly-gray-2"
              minLength="3"
              maxLength="8"
              onChange={handleNickName}
            />
          </form>
          <button
            className="absolute top-[180px] h-9 w-52 rounded-lg bg-lionly-primary-color px-2 py-2 text-lionly-md text-lionly-white"
            type="submit"
            onKeyDown={(e) => handlePreventTabControl(e)}
            onClick={() => {
              handleUpdate();
            }}
          >
            변경하기
          </button>
        </div>
        <LionLogoSVG
          aria-hidden
          className="absolute bottom-0 right-4 h-16 w-14"
        />
      </div>
    </div>
  );
}

ProfileEdit.propTypes = {
  onClose: func,
};

export default ProfileEdit;
