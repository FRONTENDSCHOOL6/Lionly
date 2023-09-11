import { ReactComponent as SignOutSVG } from '@/assets/signOut_MyPage.svg';
import { ReactComponent as ButtonPrevSVG } from '@/assets/buttonPrev_MyPage.svg';

function MypPageHeader() {
  return (
    <div>
      <div className="mx-4 mb-[30px] mt-4 flex justify-between bg-lionly-primary-color">
        <button type="button">
          <ButtonPrevSVG />
        </button>
        <h1 className="text-lionly-lg text-lionly-white">마이페이지</h1>
        <button type="button">
          <SignOutSVG />
        </button>
      </div>
    </div>
  );
}

export default MypPageHeader;
