import { func, node, string } from 'prop-types';
import useProfileImage from '@/hooks/useProfileImage';

function ProfileImage({ handleInputClick, children }) {
  const { profileImageURL } = useProfileImage();

  return (
    <div
      className="relative h-[70px] w-[70px]"
      onClick={handleInputClick}
      tabIndex={0}
    >
      {profileImageURL === undefined ? null : (
        <img
          src={profileImageURL}
          alt="프로필 이미지"
          className="h-full w-full rounded-full border border-lionly-gray-4 bg-cover bg-no-repeat"
        />
      )}
      {children}
    </div>
  );
}

ProfileImage.propTypes = {
  profileImageURL: string,
  handleInputClick: func,
  children: node,
};

export default ProfileImage;
