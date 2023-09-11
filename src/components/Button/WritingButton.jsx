import { ReactComponent as PenSVG } from '@/assets/pen_Writing.svg';
import { useNavigate } from 'react-router-dom';

function WritingButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        navigate('/writing');
      }}
      className="flex h-[34px] w-[88px] items-center justify-center gap-2 rounded-lg bg-lionly-secondary-color text-lionly-md text-lionly-white"
    >
      <PenSVG aria-hidden />
      글쓰기
    </button>
  );
}

export default WritingButton;
