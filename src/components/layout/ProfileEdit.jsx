import useStorageData from '@/hooks/useStorageData';
import { ProfileImage } from '../button';
import { shape, string } from 'prop-types';
import { ReactComponent as DeleteSVG } from '@/assets/delete_Feed.svg';
import { ReactComponent as LionLogoSVG } from '@/assets/lionLogo_common.svg';

function ProfileEdit() {
  const { profile_image, id } = useStorageData();

  // const nickNameRef = useRef(null);

  return (
    <>
      <div className="z-40 mx-auto h-60 w-60 bg-lionly-white">
        <button>
          <DeleteSVG />
        </button>
        <div className="flex flex-col items-center gap-2">
          <button>
            <ProfileImage handleInputClick={[id, profile_image]} />
          </button>
          <label htmlFor="nickname"></label>
          <input
            id="nickname"
            type="text"
            label="닉네임"
            name="nickname"
            placeholder="변경할 닉네임을 입력하세요."
            className="h-9 w-40 gap-2 rounded-lg border bg-lionly-gray-4 px-3 py-3 text-lionly-sm  outline-none  placeholder:text-lionly-gray-2"
            minLength="3"
            maxLength="8"
          />
          <button
            className="h-9 w-40 rounded-lg bg-lionly-primary-color px-2 py-2 text-lionly-md text-lionly-white"
            type="submit"
          >
            변경하기
          </button>
        </div>
        <LionLogoSVG className="h-16 w-14" />
      </div>
    </>
  );
}

ProfileEdit.propTypes = {
  item: shape({
    id: string,
    profile_image: string,
  }),
};
export default ProfileEdit;
