import { useNavigate } from 'react-router-dom';
import { LogoutButton, ProfileImage, WritingButton } from '../button';
import { ReactComponent as LionHeadLogo } from '/src/assets/lionHeadLogo_common.svg';
import { handleTabArrowControl } from '@/utils';

function FeedHeader() {
  const navigate = useNavigate();

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
          <span className="text-lionly-lg">두부 왕자</span>
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
