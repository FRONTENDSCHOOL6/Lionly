import { useContext } from 'react';
import { ProfileImageContext } from '@/contexts/ProfileImage';

function useProfileImage() {
  const value = useContext(ProfileImageContext);

  if (value === undefined) {
    throw new Error(
      'useProfileImage Hook은 ProfileImageProvider 안에서 사용되어야 합니다.'
    );
  }

  return value;
}

export default useProfileImage;
