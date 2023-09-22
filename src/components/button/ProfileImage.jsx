import lionHeadLogo from '@/assets/lionHeadLogo_common.svg';
import { array, number } from 'prop-types';

function ProfileImage({ size = 40, imageName = [] }) {
  const imageURL = `https://lionly.pockethost.io/api/files/users/${imageName[0]}/${imageName[1]}`;

  console.log(imageName);
  return (
    <img
      src={imageName[1] === '' ? lionHeadLogo : imageURL}
      aria-hidden
      className="rounded-full border-2 border-lionly-gray-4 bg-cover bg-no-repeat shadow-lg"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
      }}
    />
  );
}

ProfileImage.propTypes = {
  size: number,
  imageName: array,
};

export default ProfileImage;
