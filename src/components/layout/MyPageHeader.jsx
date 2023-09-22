import { ReactComponent as ButtonPrevSVG } from '@/assets/buttonPrev_MyPage.svg';
import { ReactComponent as SignOutSVG } from '@/assets/signOut_MyPage.svg';
import useStorageData from '@/hooks/useStorageData';
import { handleKeyboardArrowControl } from '@/utils';
import { shape, string } from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LinkButton from '../Button/LinkButton';
import { ProfileImage } from '../button';
import pb from './../../api/pocketbase';
import ProfileEdit from './ProfileEdit';

function MyPageHeader() {
  const navigate = useNavigate();
  const { profile_image, email, nickname, id } = useStorageData();
  const [openModal, setOpenModal] = useState(false);

  const modalClose = () => {
    setOpenModal(false);
  };

  const handleSignOut = () => {
    const signOut = confirm('로그아웃 하시겠습니까?');
    if (signOut) {
      pb.authStore.clear();
    }
  };

  return (
    <>
      <div className="mx-auto bg-lionly-primary-color">
        <div className="mx-4 mb-[10px] flex justify-between pt-4 ">
          <button
            aria-label="피드로 이동"
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ButtonPrevSVG
              aria-hidden
              onKeyDown={handleKeyboardArrowControl}
              className=" fill-lionly-primary-color hover:scale-125"
            />
          </button>
          <h1
            className="text-lionly-lg text-lionly-white"
            aria-label="마이페이지"
          >
            마이페이지
          </h1>
          <button type="button" aria-label="로그아웃" onClick={handleSignOut}>
            <SignOutSVG
              aria-hidden
              onKeyDown={handleKeyboardArrowControl}
              className=" fill-lionly-primary-color hover:scale-125"
            />
          </button>
        </div>

        <figure className="flex flex-col items-center">
          <ProfileImage size={70} imageName={[id, profile_image]} />
          <figcaption className="flex flex-col items-center">
            <p className="mb-2 mt-3 text-lionly-sm-bold text-lionly-gray-2">
              <u>{email}</u>
            </p>
            <p className="mb-3 items-center text-lionly-lg text-lionly-black">
              {nickname}
            </p>
          </figcaption>
        </figure>

        {openModal == true ? <ProfileEdit onClose={modalClose} /> : null}
        <div className="mx-[65px] px-[35px] pb-5">
          <LinkButton
            aria-label="프로필 편집"
            text="프로필 편집"
            onClick={() => {
              setOpenModal(!openModal);
            }}
          />
        </div>
      </div>
    </>
  );
}

MyPageHeader.propTypes = {
  item: shape({
    id: string,
    email: string,
    nickname: string,
    profile_image: string,
  }),
};

export default MyPageHeader;
