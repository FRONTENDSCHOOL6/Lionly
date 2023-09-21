import { ReactComponent as LeftArrow } from '@/assets/arrow_common_left.svg';
import { useChannel } from '@/hooks';
import { object } from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

function Header({ data }) {
  const navigate = useNavigate();
  const { channelList } = useChannel();
  // const { contentData } = useContent();

  const activatedChannelIndex = Object.values(channelList).indexOf(true);

  // const handleGoBack = () => {
  //   switch (activatedChannelIndex) {
  //     case 0:
  //       navigate('/feed');
  //       break;
  //     case 1:
  //       navigate('/feed/daily');
  //       break;
  //     case 2:
  //       navigate('/feed/food');
  //       break;
  //     case 3:
  //       navigate('/feed/job');
  //       break;
  //     case 4:
  //       navigate('/feed/healing');
  //       break;
  //   }

  //   return;
  // };
  // console.log();
  return (
    <header className="sticky top-0 z-10 flex justify-center bg-lionly-primary-color px-4 py-3">
      <Link
        aria-label="뒤로 가기"
        role="button"
        tabIndex="0"
        onClick={() => navigate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-125"
      >
        <LeftArrow className="fill-lionly-primary-color" />
      </Link>

      <div className="flex flex-col items-center">
        <h2 className="text-lionly-sm text-lionly-white">{data.channels}</h2>

        <h3 className="w-full text-center text-lionly-base font-bold text-lionly-black">
          {data.expand?.author.nickname}의 게시글
        </h3>
      </div>
    </header>
  );
}

Header.propTypes = {
  data: object,
};

export default Header;
