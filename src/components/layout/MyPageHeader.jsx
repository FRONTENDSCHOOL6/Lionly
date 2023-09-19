import { ReactComponent as SignOutSVG } from '@/assets/signOut_MyPage.svg';
import { ReactComponent as ButtonPrevSVG } from '@/assets/buttonPrev_MyPage.svg';
import pb from './../../api/pocketbase';
import useStorageData from '@/hooks/useStorageData';
import LinkButton from '../Button/LinkButton';
import { shape, string } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { handleTabArrowControl } from '@/utils';
import { ProfileImage } from '../button';
import { useState } from 'react';
import ProfileEdit from './ProfileEdit';
// import toast from 'react-hot-toast';

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
        <div className="mx-4 mb-[30px] mt-4 flex justify-between ">
          <button
            type="button"
            onClick={() => {
              navigate('/feed');
            }}
          >
            <ButtonPrevSVG
              aria-hidden
              onKeyDown={handleTabArrowControl}
              tabindex="0"
              className=" fill-lionly-primary-color hover:scale-125"
            />
          </button>
          <h1 className="text-lionly-lg text-lionly-white">마이페이지</h1>
          <button type="button" onClick={handleSignOut}>
            <SignOutSVG
              aria-hidden
              onKeyDown={handleTabArrowControl}
              tabindex="0"
              className=" fill-lionly-primary-color hover:scale-125"
            />
          </button>
        </div>

        <figure className="flex flex-col items-center">
          <ProfileImage imageName={[id, profile_image]} />
          <figcaption className="flex flex-col items-center">
            <p className="mb-2 mt-3 text-lionly-xs text-lionly-gray-2">
              <u>{email}</u>
            </p>
            <p className="mb-7 items-center text-lionly-lg text-lionly-black">
              {nickname}
            </p>
          </figcaption>
        </figure>

        {openModal == true ? <ProfileEdit onClose={modalClose} /> : null}
        <div className="mx-[65px] px-[35px]">
          <LinkButton
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
