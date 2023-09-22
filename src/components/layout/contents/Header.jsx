import { ReactComponent as LeftArrow } from '@/assets/arrow_common_left.svg';
import { object } from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Header({ contentData }) {
  const navigate = useNavigate();

  return (
    contentData && (
      <header className="sticky top-0 z-10 flex justify-center bg-lionly-primary-color px-4 py-3">
        <LeftArrow
          aria-label="뒤로 가기"
          role="button"
          tabIndex="0"
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer fill-lionly-primary-color transition-all hover:scale-125"
        />

        <div className="flex flex-col items-center">
          <h2 className="text-lionly-sm text-lionly-white">
            {contentData.channel}
          </h2>

          <h3 className="w-full text-center text-lionly-base font-bold text-lionly-black">
            {contentData.authorNickname}의 게시글
          </h3>
        </div>
      </header>
    )
  );
}

Header.propTypes = {
  contentData: object,
};

export default Header;
