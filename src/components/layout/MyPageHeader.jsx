import { ReactComponent as SignOutSVG } from '@/assets/signOut_MyPage.svg';
import { ReactComponent as ButtonPrevSVG } from '@/assets/buttonPrev_MyPage.svg';
import pb from './../../api/pocketbase';
import useStorageData from '@/hooks/useStorageData';
import LinkButton from '../Button/LinkButton';
import renderImg from '@/utils/getImageData';
import { shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { handleTabArrowControl } from '@/utils';

function MyPageHeader() {
  const { profile_image, email, nickname, collectionName, id } =
    useStorageData();

  return (
    <>
      <div className="mx-auto">
        <div className="mx-4 mb-[30px] mt-4 flex justify-between bg-lionly-primary-color">
          <Link to="/feed">
            <button type="button">
              <ButtonPrevSVG
                aria-hidden
                onKeyDown={handleTabArrowControl}
                tabindex="0"
              />
            </button>
          </Link>
          <h1 className="text-lionly-lg text-lionly-white">마이페이지</h1>
          <button
            type="button"
            onClick={() => {
              pb.authStore.clear();
            }}
          >
            <SignOutSVG
              aria-hidden
              onKeyDown={handleTabArrowControl}
              tabindex="0"
            />
          </button>
        </div>

        <figure className="flex flex-col items-center">
          <img
            src={renderImg(collectionName, id, profile_image)}
            alt=""
            className="h-[58px] w-[58px] rounded-full"
          />
          <figcaption className="flex flex-col items-center">
            <p className="mb-2 mt-3 text-lionly-xs text-lionly-gray-2">
              <u>{email}</u>
            </p>
            <p className="mb-7 items-center text-lionly-lg text-lionly-black">
              {nickname}
            </p>
          </figcaption>
        </figure>
        <LinkButton text="프로필 편집" />
      </div>
    </>
  );
}

MyPageHeader.propTypes = {
  item: shape({
    id: string,
    email: string,
    nickname: string,
    collectionName: string,
    profile_image: string,
  }).isRequired,
};

export default MyPageHeader;
