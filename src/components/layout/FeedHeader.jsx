import useStorageData from '@/hooks/useStorageData';
import { useNavigate } from 'react-router-dom';
import { LogoutButton, ProfileImage, WritingButton } from '../button';
import { ReactComponent as LionHeadLogoSVG } from '/src/assets/lionHeadLogo_common.svg';
import { ReactComponent as ProfileEditSVG } from '/src/assets/profileEdit_Feed.svg';

function FeedHeader() {
  const navigate = useNavigate();
  const { id, nickname, profile_image } = useStorageData();

  return (
    <header className="bg-lionly-primary-color px-4">
      <div className="flex items-center justify-between border-b border-lionly-secondary-color">
        <div className="flex items-center gap-x-2.5">
          <LionHeadLogoSVG aria-hidden />
          <h1 className="text-lionly-xl text-white">Lionly</h1>
        </div>
        <ProfileEditSVG
          aria-hidden
          tabIndex="0"
          width={24}
          height={24}
          onClick={() => {
            navigate('/mypage');
          }}
          className="cursor-pointer fill-lionly-white shadow-lg transition-all hover:scale-125 focus:scale-125"
        />
      </div>

      <div className="flex items-center justify-center gap-x-8 gap-y-2 py-8 text-lionly-white">
        <ProfileImage imageName={[id, profile_image]} />
        <div className="flex h-[70px] flex-col justify-between">
          <span className="block text-lionly-lg">{nickname}</span>
          <div className="flex gap-x-[10px]">
            <WritingButton />
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default FeedHeader;
