import BigButton from '@/components/button/LinkButton';

function Landing() {
  return (
    <div className="mt-[162px] flex w-full justify-center px-[35px]">
      <h2 className="sr-only">랜딩 페이지</h2>
      <BigButton text="시작하기" destination="/signin" />
    </div>
  );
}

export default Landing;
