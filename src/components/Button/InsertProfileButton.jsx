import { ReactComponent as ProfilePencilSVG } from '@/assets/profilePencil_myProfile.svg';
import useProfileImage from '@/hooks/useProfileImage';
import { useRef } from 'react';
import ProfileImage from './ProfileImage';

function InsertProfileButton() {
  const handleInputClick = () => {
    inputFileRef.current.click();
  };
  const inputFileRef = useRef();
  const { handleMakeImageURL } = useProfileImage();

  return (
    <>
      <label htmlFor="profileImage" className="sr-only">
        프로필 이미지 파일 불러오기
      </label>

      <ProfileImage handleInputClick={handleInputClick}>
        <ProfilePencilSVG aria-hidden className="absolute bottom-0 right-0" />
      </ProfileImage>
      <ProfileImage small={true} />
      <ProfileImage />

      <input
        ref={inputFileRef}
        type="file"
        id="profileImage"
        name="profileImage"
        accept="image/*"
        className="hidden"
        onChange={handleMakeImageURL}
      />
    </>
  );
}

export default InsertProfileButton;
