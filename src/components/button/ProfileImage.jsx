import { ReactComponent as CameraIconSVG } from '@/assets/camera_myProfile.svg';
import lionHeadLogo from '@/assets/lionHeadLogo_common.svg';
import { array, func, number, string } from 'prop-types';

function ProfileImage({
  size = 40,
  handleInputClick,
  nickname,
  imageName = [],
}) {
  const imageURL = `${import.meta.env.VITE_PB_API}/files/users/${
    imageName[0]
  }/${imageName[1]}`;

  return (
    <div
      className={`relative`}
      onClick={handleInputClick}
      tabIndex={handleInputClick ? 0 : -1}
    >
      <img
        src={imageName[1] === '' ? lionHeadLogo : imageURL}
        alt={`${nickname}의 프로필 이미지`}
        className={`min-w-[${size}px] min-h-[${size}px] rounded-full border-2 border-lionly-gray-4 bg-cover bg-no-repeat shadow-lg`}
        style={{ width: `${size}px`, height: `${size}px` }}
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
    </div>
  );
}

ProfileImage.propTypes = {
  size: number,
  handleInputClick: func,
  nickname: string,
  imageName: array,
};

export default ProfileImage;
