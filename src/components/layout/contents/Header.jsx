import { ReactComponent as LeftArrow } from '@/assets/arrow_common_left.svg';
import { useChannel, useContent } from '@/hooks';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const { channelList } = useChannel();
  const { contentData } = useContent();

  const activatedChannelIndex = Object.values(channelList).indexOf(true);

  const handleGoBack = () => {
    switch (activatedChannelIndex) {
      case 0:
        navigate('/feed');
        break;
      case 1:
        navigate('/feed/daily');
        break;
      case 2:
        navigate('/feed/food');
        break;
      case 3:
        navigate('/feed/job');
        break;
      case 4:
        navigate('/feed/healing');
        break;
    }

    return;
  };

  return (
    <header className="sticky top-0 z-10 flex justify-center bg-lionly-primary-color px-4 py-3">
      <LeftArrow
        aria-label="뒤로 가기"
        role="button"
        tabIndex="0"
        onClick={handleGoBack}
        className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer fill-lionly-primary-color transition-all hover:scale-125"
      />

      <div className="flex flex-col items-center">
        <h2 className="text-lionly-sm text-lionly-white">
          {contentData.channels}
        </h2>

        <h3 className="w-full text-center text-lionly-base font-bold text-lionly-black">
          {contentData.expand?.author.nickname}의 게시글
        </h3>
      </div>
    </header>
  );
}

export default Header;
