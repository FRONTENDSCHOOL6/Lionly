import { ReactComponent as LeftArrow } from '@/assets/leftarrow.svg';
import { Helmet } from 'react-helmet-async';
import { useRef, useState } from 'react';
import { maxLengthCheck } from '@/utils/maxLengthCheck';
import check from '@/assets/check.svg';
import plus from '@/assets/plus.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import createFeedData from '@/api/createFeedData';
import useStorageData from '@/hooks/useStorageData';

function Writing() {
  const [inputCount, setInputCount] = useState(0);
  const imageInput = useRef(null);
  const uploadImageRef = useRef(null);
  const headerRef = useRef(null);
  const textareaRef = useRef(null);
  const channelsRef = useRef(null);
  const { id } = useStorageData();
  const navigate = useNavigate();

  const handleInputCount = (e) => {
    const inputValue = e.target.value;
    maxLengthCheck(e.target);
    setInputCount(e.target.value.length);
  };

  const handleImageUpload = () => {
    imageInput.current.click();
  };

  const handleTextDelete = () => {
    textareaRef.current.value = '';
    setInputCount(0);
  };

  const handleUploadImg = (e) => {
    const imgFile = e.target.files[0];
    const imgUrl = URL.createObjectURL(imgFile);
    uploadImageRef.current.style.backgroundImage = `url('${imgUrl}')`;
  };

  const handleRegisterData = async (e) => {
    e.preventDefault();

    const imageValue = imageInput.current.files[0];
    const textValue = textareaRef.current.value;
    const channelsValue = channelsRef.current.value;
    const authorValue = id;

    const formData = new FormData();
    formData.append('feed_image', imageValue);
    formData.append('text', textValue);
    formData.append('channels', channelsValue);
    formData.append('author', authorValue);

    await createFeedData(formData);
    try {
      if (confirm('게시물을 업로드 하시겠습니까?')) {
        toast.success('게시물이 업로드 되었습니다.');
        navigate('/feed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Helmet>
        <title>Lionly - Writing</title>
      </Helmet>

      <div ref={headerRef} className="mt-4 flex justify-between px-4 pb-3">
        <Link to="/mypage" className="cursor-pointer">
          <LeftArrow className="mt-2" />
        </Link>
        <button
          type="submit"
          className="rounded-full border border-lionly-white px-3 py-[7px] text-lionly-sm text-lionly-white  hover:bg-lionly-secondary-color"
          onClick={handleRegisterData}
        >
          <img src={check} alt="" className="inline-block pr-2" />
          등록
        </button>
      </div>

      <div className="flex flex-1 flex-col">
        <form encType="multipart/form-data" onSubmit={handleRegisterData}>
          <div
            ref={uploadImageRef}
            className="flex aspect-[9/5] w-full justify-center rounded-md bg-cover bg-center bg-no-repeat"
          >
            <button
              className="border-lionly-white-2 mt-[25%] h-10 w-[130px] rounded-full border-2 bg-none px-4 py-[11px] text-lionly-sm-bold text-lionly-white hover:bg-lionly-secondary-color"
              type="button"
              onClick={handleImageUpload}
            >
              <img src={plus} alt="" className="inline-block pr-2" />
              사진 추가하기
            </button>
          </div>
          <input
            type="file"
            className="sr-only"
            ref={imageInput}
            accept="*.jpg,*.png,*.jpeg,*.webp,*.avif, *.gif"
            name="img"
            id="img"
            onChange={handleUploadImg}
          />
        </form>

        <div
          className={`flex w-full flex-1 flex-col rounded-xl bg-lionly-white px-[35px]`}
        >
          <div className="flex justify-between py-[23px]">
            <div className="flex gap-2">
              <h2>게시물 작성</h2>
              <span className="font-thin text-lionly-red">{inputCount}</span>
              <span className="text-lionly-base font-thin text-lionly-gray-3">
                / 200
              </span>
            </div>

            <div className="flex gap-10">
              <select
                className="w-[100px] pl-4 text-sm outline-none"
                ref={channelsRef}
              >
                <option value="일상방">일상방 🌉</option>
                <option value="맛집방">맛집방 🍕</option>
                <option value="취업방">취업방 🧑🏻‍💻</option>
                <option value="힐링방">힐링방 ☘️</option>
              </select>
              <button
                type="button"
                className="text-lionly-sm-bold text-lionly-gray-3"
                onClick={handleTextDelete}
              >
                전체 삭제
              </button>
            </div>
          </div>

          <textarea
            name="content"
            placeholder="글을 작성해주세요."
            className="w-full flex-1 resize-none rounded-xl border-none placeholder:pt-[10%] placeholder:text-center focus:outline-none"
            maxLength="200"
            onChange={handleInputCount}
            ref={textareaRef}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Writing;
