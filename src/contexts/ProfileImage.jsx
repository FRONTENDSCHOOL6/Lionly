import getProfileImageURL from '@/api/getProfileImageURL';
import defaultProfileImage from '@/assets/lionHeadLogo_common.svg';
import { useQuery } from '@tanstack/react-query';
import { node, string } from 'prop-types';
import { createContext, useState } from 'react';

export const ProfileImageContext = createContext({});

function ProfileImageProvider({
  displayName = 'ProfileImageContext',
  children,
}) {
  const [profileImageURL, setProfileImageURL] = useState(defaultProfileImage);
  const handleMakeImageURL = (e) => {
    const imageURL = Array.from(e.target.files)
      .map((item) => {
        return URL.createObjectURL(item);
      })
      .toString();

    setProfileImageURL(imageURL);
  };

  const { status } = useQuery({
    queryKey: ['profileImage'],
    queryFn: getProfileImageURL('6onsajcamfqzzjg'),
    onSuccess: ({ profileImageId, profileImageName }) => {
      const profileImageURL = `${
        import.meta.env.VITE_PB_API
      }/files/users/${profileImageId}/${profileImageName}`;

      setProfileImageURL(profileImageURL);
    },

    retry: 2,
  });

  console.log('ProfileImage: ', status);

  return (
    <ProfileImageContext.Provider
      value={{ profileImageURL, handleMakeImageURL }}
      displayName={displayName}
    >
      {children}
    </ProfileImageContext.Provider>
  );
}

ProfileImageProvider.propTypes = {
  displayName: string,
  children: node,
};

export default ProfileImageProvider;
