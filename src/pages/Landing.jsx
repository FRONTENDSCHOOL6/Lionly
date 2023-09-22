import LinkButton from '@/components/button/LinkButton';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="mt-[162px] flex w-full justify-center px-[35px]">
      <h2 className="sr-only">랜딩 페이지</h2>
      <LinkButton
        text="시작하기"
        onClick={() => {
          navigate('/signin');
        }}
      />
    </div>
  );
}

export default Landing;
