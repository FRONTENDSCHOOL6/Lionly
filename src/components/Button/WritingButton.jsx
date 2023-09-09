import { ReactComponent as PenSVG } from '@/assets/pen_Writing.svg';
import { Link } from 'react-router-dom';

function WritingButton() {
  return (
    <Link
      to="/writing"
      role="button"
      className="flex h-[34px] w-[88px] items-center justify-center gap-2 rounded-lg bg-lionly-secondary-color text-lionly-md text-lionly-white"
    >
      <PenSVG />
      글쓰기
    </Link>
  );
}

export default WritingButton;
