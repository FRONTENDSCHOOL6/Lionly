import { ReactComponent as CameraIconSVG } from '@/assets/camera_myProfile.svg';
import useProfileImage from '@/hooks/useProfileImage';
import { bool, func, node } from 'prop-types';

/* small을 전달 받으면 작은 프로필 아이콘으로 구현됩니다.
handleInputClick 함수를 전달 받으면 프로필 변경 버튼으로,
전달 받지 않으면 일반 프로필 아이콘으로 구현됩니다. */
function ProfileImage({ small = false, handleInputClick, children }) {
  const { profileImageURL } = useProfileImage();

  return (
    <div
      className={`relative ${
        small ? 'h-10 w-10 min-w-fit' : 'h-[70px] w-[70px] min-w-fit'
      }`}
      onClick={handleInputClick}
      tabIndex={0}
    >
      <img
        src={profileImageURL}
        alt="프로필 이미지"
        className="
          h-full w-full
        rounded-full border-2 border-lionly-gray-4 bg-cover bg-no-repeat"
      />

      {handleInputClick ? (
        <div className="group absolute top-0 h-full w-full rounded-full border-2 text-lionly-sm-bold transition-all hover:bg-lionly-black hover:bg-opacity-[0.85]">
          <CameraIconSVG
            aria-hidden
            className="absolute left-[calc(50%-12px)] top-2.5 hidden w-6 group-hover:block"
          />
          <span className="absolute bottom-3 left-[calc(50%-22.135px)] hidden text-lionly-white group-hover:block">
            사진 변경
          </span>
        </div>
      ) : null}

      {children}
    </div>
  );
}

ProfileImage.propTypes = {
  small: bool,
  handleInputClick: func,
  children: node,
};

export default ProfileImage;
