import defaultProfileImage from '@/assets/lionHeadLogo_common.svg';
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
