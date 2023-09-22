import { ReactComponent as PenSVG } from '@/assets/pen_Writing.svg';
import { handleKeyboardArrowControl } from '@/utils';
import { useNavigate } from 'react-router-dom';

function WritingButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onKeyDown={handleKeyboardArrowControl}
      onClick={() => {
        navigate('/writing');
      }}
      className="flex h-[34px] w-[88px] items-center justify-center gap-2 rounded-lg bg-lionly-secondary-color text-lionly-md text-lionly-white shadow-lg transition-all hover:scale-110"
    >
      <PenSVG className="fill-none" aria-hidden />
      글쓰기
    </button>
  );
}

export default WritingButton;
