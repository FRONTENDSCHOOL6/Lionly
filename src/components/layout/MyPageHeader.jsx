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

  return (
    <>
      <div className="mx-auto bg-lionly-primary-color">
        <div className="mx-4 mb-[30px] mt-4 flex justify-between ">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ButtonPrevSVG
              aria-hidden
              onKeyDown={handleKeyboardArrowControl}
              tabIndex="0"
            />
          </button>
          <h1 className="text-lionly-lg text-lionly-white">마이페이지</h1>
          <button
            type="button"
            onClick={() => {
              pb.authStore.clear();
            }}
          >
            <SignOutSVG
              aria-hidden
              onKeyDown={handleKeyboardArrowControl}
              tabIndex="0"
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
