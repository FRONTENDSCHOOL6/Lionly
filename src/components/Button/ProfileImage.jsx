import { ReactComponent as CameraIconSVG } from '@/assets/camera_myProfile.svg';
import useProfileImage from '@/hooks/useProfileImage';
import { func, node } from 'prop-types';

function ProfileImage({ handleInputClick, children }) {
  const { profileImageURL } = useProfileImage();

  return (
    <div
      className="relative h-[70px] w-[70px]"
      onClick={handleInputClick}
      tabIndex={0}
    >
      <img
        src={profileImageURL}
        alt="프로필 이미지"
        className="hover: h-full w-full rounded-full border-2 border-lionly-gray-4 bg-cover bg-no-repeat"
      />

      {handleInputClick ? (
        <div className="group absolute top-0 h-full w-full rounded-full border-2 text-lionly-sm-bold transition-all hover:bg-lionly-black hover:bg-opacity-[0.85]">
          <CameraIconSVG className="absolute left-[calc(50%-12px)] top-2.5 hidden w-6 group-hover:block" />
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
  handleInputClick: func,
  children: node,
};

export default ProfileImage;
