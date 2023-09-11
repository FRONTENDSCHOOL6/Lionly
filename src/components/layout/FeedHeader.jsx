import getProfileNickname from '@/api/getProfileNickname';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutButton, ProfileImage, WritingButton } from '../button';
import { ReactComponent as LionHeadLogo } from '/src/assets/lionHeadLogo_common.svg';
import { ReactComponent as ProfileEdit } from '/src/assets/profileEdit_Feed.svg';

function FeedHeader() {
  const [nickname, setNickname] = useState('닉네임 불러오는 중...');
  const navigate = useNavigate();
  useQuery({
    queryKey: ['nickname'],
    queryFn: getProfileNickname,
    onSuccess: (nickname) => {
      setNickname(nickname);
    },

    retry: 2,
  });

  return (
    <div className="bg-lionly-primary-color px-4">
      <div className="flex items-center justify-between border-b border-lionly-secondary-color">
        <div
          tabIndex="0"
          onClick={() => {
            navigate('/');
          }}
          className="flex cursor-pointer items-center gap-x-2.5"
        >
          <LionHeadLogo />
          <h1 className="text-lionly-xl text-white">Lionly</h1>
        </div>
        <ProfileEdit
          tabIndex="0"
          width={24}
          height={24}
          onClick={() => {
            navigate('/mypage');
          }}
          className="cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-center gap-x-8 gap-y-2 py-8 text-lionly-white">
        <ProfileImage />
        <div className="flex h-[70px] flex-col justify-between">
          <span className="block text-lionly-lg">{nickname}</span>
          <div className="flex gap-x-[10px]">
            <WritingButton />
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedHeader;
