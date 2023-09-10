import getProfileNickname from '@/api/getProfileNickname';
import { handleTabArrowControl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutButton, ProfileImage, WritingButton } from '../button';
import { ReactComponent as LionHeadLogo } from '/src/assets/lionHeadLogo_common.svg';

function FeedHeader() {
  const [nickname, setNickname] = useState(null);
  const navigate = useNavigate();
  const { status } = useQuery({
    queryKey: ['nickname'],
    queryFn: getProfileNickname,
    onSuccess: (nickname) => {
      setNickname(nickname);
    },

    retry: 2,
  });

  console.log('FeedHeader: ', status);

  return (
    <div className="bg-lionly-primary-color px-4">
      <div className="flex justify-between border-b border-lionly-secondary-color">
        <div
          tabIndex="0"
          onClick={() => {
            navigate('/');
          }}
          onKeyDown={handleTabArrowControl}
          className="flex cursor-pointer items-center gap-x-2.5"
        >
          <LionHeadLogo />
          <h1 className="text-lionly-xl text-white">Lionly</h1>
        </div>
        <button className="flex w-7 flex-col justify-center gap-y-1">
          <span
            aria-hidden
            className="block h-1 w-full rounded-xl bg-white"
          ></span>
          <span
            aria-hidden
            className="block h-1 w-full rounded-xl bg-white"
          ></span>
          <span
            aria-hidden
            className="block h-1 w-full rounded-xl bg-white"
          ></span>
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-x-8 pb-[30px] text-lionly-white">
        <ProfileImage />
        <div>
          <span className="text-lionly-lg">{nickname}</span>
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
