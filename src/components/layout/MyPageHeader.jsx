import { ReactComponent as SignOutSVG } from '@/assets/signOut_MyPage.svg';
import { ReactComponent as ButtonPrevSVG } from '@/assets/buttonPrev_MyPage.svg';
import ProfileImage from './../Button/ProfileImage';
import getProfileNickname from '@/api/getProfileNickname';
import { useQuery } from '@tanstack/react-query';
import getProfileEmail from '@/api/getProfileEmail';
// import { BigButton } from '../Button';

function MypPageHeader() {
  const { data: email } = useQuery(['email'], getProfileEmail, {
    retry: 3,
    cacheTime: 5 * 60 * 1000,
    staleTime: 3 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const { data: nickname } = useQuery(['nickname'], getProfileNickname, {
    retry: 3,
    cacheTime: 5 * 60 * 1000,
    staleTime: 3 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return (
    <div className="mx-auto">
      <div className="mx-4 mb-[30px] mt-4 flex justify-between bg-lionly-primary-color">
        <button type="button">
          <ButtonPrevSVG />
        </button>
        <h1 className="text-lionly-lg text-lionly-white">마이페이지</h1>
        <button type="button">
          <SignOutSVG />
        </button>
      </div>

      <figure className=" ">
        {/* <img src="" alt="" className="mb-3" /> */}
        <ProfileImage />
        <figcaption>
          <p className="mb-2 mt-3 text-lionly-xs text-lionly-gray-2">
            <u>{email}</u>
          </p>
          <p className="mb-7 text-lionly-lg text-lionly-black">{nickname}</p>
        </figcaption>
        {/* <BigButton text="프로필 편집" /> */}
      </figure>
    </div>
  );
}

export default MypPageHeader;
