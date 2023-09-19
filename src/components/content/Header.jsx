import { ReactComponent as LeftArrow } from '@/assets/arrow_common_left.svg';
import { object, string } from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Header({ data, pathname }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 flex bg-lionly-primary-color px-4 py-3">
      <LeftArrow
        aria-label="뒤로 가기"
        role="button"
        tabIndex="0"
        onClick={() => {
          navigate(-1);
        }}
        className="absolute cursor-pointer fill-lionly-primary-color transition-all hover:scale-125"
      />
      <h2 className="w-full text-center text-lionly-base font-bold text-lionly-white">
        {data.expand.author.nickname}의 게시글
      </h2>
    </header>
  );
}

Header.propTypes = {
  data: object,
  pathname: string,
};

export default Header;
