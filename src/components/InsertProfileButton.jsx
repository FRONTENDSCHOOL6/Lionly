import { useRef, useState } from 'react';
import defaultProfileImage from '@/assets/lionHeadLogo_common.svg';
import { ReactComponent as ProfilePencil } from '@/assets/profilePencil_myProfile.svg';

function InsertProfileButton() {
  const inputFileRef = useRef();
  const handleInputClick = () => {
    inputFileRef.current.click();
  };
  const handleMakeImageURL = (e) => {
    const imageURL = Array.from(e.target.files)
      .map((item) => {
        return URL.createObjectURL(item);
      })
      .toString();

    setProfileImageURL(imageURL);
  };
  const [profileImageURL, setProfileImageURL] = useState(defaultProfileImage);

  return (
    <>
      <label htmlFor="profileImage" className="sr-only">
        프로필 이미지 파일 불러오기
      </label>
      <div className="relative h-[70px] w-[70px]" onClick={handleInputClick}>
        {profileImageURL === undefined ? null : (
          <img
            src={profileImageURL}
            alt="프로필 이미지"
            className="h-full w-full rounded-full border border-lionly-gray-4 bg-cover bg-no-repeat"
          />
        )}
        <ProfilePencil className="absolute bottom-0 right-0" />
      </div>
      <input
        ref={inputFileRef}
        type="file"
        name="profileImage"
        id="profileImage"
        accept="image/*"
        className="hidden"
        onChange={handleMakeImageURL}
      />
    </>
  );
}

export default InsertProfileButton;
