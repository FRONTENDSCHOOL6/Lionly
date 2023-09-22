import { ReactComponent as LeftArrow } from '@/assets/leftarrow.svg';
import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import check from '@/assets/check.svg';
import plus from '@/assets/plus.svg';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import createFeedData from '@/api/createFeedData';
import useStorageData from '@/hooks/useStorageData';
import useUpLoadImage from '@/hooks/useUploadImage';
import useTextarea from '@/hooks/useTextarea';
import { motion } from 'framer-motion';
import useInfiniteFeed from '@/hooks/useInfiniteFeed';
import useIsLogin from '@/contexts/AuthProvider';
import { readAndCompressImage } from 'browser-image-resizer';

function Writing() {
  const { handleUploadImg, handleImageUpload, imageInput, uploadImageRef } =
    useUpLoadImage();
  const { handleInputCount, handleTextDelete, inputCount, textareaRef } =
    useTextarea();
  const { refetch } = useInfiniteFeed();
  useIsLogin();
  const config = {
    quality: 0.5,
    maxWidth: 1000,
    maxHeight: 1000,
  };
  const textareaMaxLength = 200;

  const channelsRef = useRef(null);
  const { id } = useStorageData();
  const navigate = useNavigate();

  const handleWritingCancel = () => {
    if (confirm('게시물 작성을 취소하시겠습니까?')) {
      toast.success('게시물 작성이 취소되었습니다.');
      navigate(-1);
    }
  };

  const handleRegisterData = async (e) => {
    e.preventDefault();

    const file = imageInput.current.files[0];
    if (file) {
      try {
        // 이미지 리사이징 및 압축
        const imageValue = await readAndCompressImage(file, config);
        const textValue = textareaRef.current.value;
        const channelsValue = channelsRef.current.value;
        const authorValue = id;

        if (!textValue.trim()) {
          toast.error('글을 작성해주세요.', { icon: '✏️' });
          return;
        }
        if (!file) {
          toast.error('이미지를 선택해주세요.', { icon: '🖼️' });
          return;
        }

        const uploadConfirm = confirm('게시물을 업로드 하시겠습니까?');

        if (uploadConfirm) {
          try {
            const formData = new FormData();
            formData.append('feed_image', imageValue);
            formData.append('text', textValue);
            formData.append('channels', channelsValue);
            formData.append('author', authorValue);

            await createFeedData(formData);

            await refetch();
            toast.success('게시물이 업로드 되었습니다.');
            navigate('/feed');
          } catch (error) {
            console.error(error);
          }
        }
      } catch (err) {
        console.error('Failed to optimize image', err);
      }
    }
  };

  return (
    <motion.div
      className="flex h-screen flex-col"
      initial={{
        opacity: 0,
        y: -50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
      }}
    >
      <Helmet>
        <title>Lionly - Writing</title>
      </Helmet>

      <header className="mt-4 flex justify-between px-4 pb-3">
        <button
          type="button"
          className="mt-2 hover:scale-125"
          aria-label="뒤로 가기"
          onClick={handleWritingCancel}
        >
          <LeftArrow />
        </button>

        <button
          type="submit"
          className="rounded-full border border-lionly-white px-3 py-[7px] text-lionly-sm text-lionly-white  hover:bg-lionly-secondary-color"
          onClick={handleRegisterData}
        >
          <img src={check} alt="" className="inline-block pr-2" />
          등록
        </button>
      </header>

      <main className="flex flex-1 flex-col">
        <form encType="multipart/form-data" onSubmit={handleRegisterData}>
          <figure
            ref={uploadImageRef}
            className="flex aspect-[9/4] w-full justify-center rounded-xl bg-cover bg-center bg-no-repeat"
          >
            <button
              className="border-lionly-white-2 mb-3 mt-[35%] h-10 w-[130px] rounded-full border-2 bg-none px-4 py-[11px] text-lionly-sm-bold text-lionly-white hover:bg-lionly-secondary-color"
              type="button"
              onClick={handleImageUpload}
            >
              <img src={plus} alt="" className="inline-block pr-2" />
              사진 추가하기
            </button>
          </figure>
          <input
            type="file"
            className="hidden"
            ref={imageInput}
            accept=".jpg,.png"
            name="img"
            id="img"
            onChange={handleUploadImg}
          />
        </form>

        <div className="flex w-full flex-1 flex-col rounded-xl bg-lionly-white px-[35px] max-[365px]:px-4">
          <div className="flex justify-between py-[23px] max-[365px]:text-sm">
            <div className="flex gap-2">
              <h2 tabIndex="0">게시물 작성</h2>
              <span
                className="font-thin text-lionly-red max-[365px]:text-sm"
                aria-live="assertive"
              >
                {inputCount}
              </span>
              <span
                className="text-lionly-base font-thin text-lionly-gray-3 max-[365px]:text-sm"
                tabIndex="0"
                aria-label="최대 글자 수 200"
              >
                / {textareaMaxLength}
              </span>
            </div>

            <div className="flex gap-10 max-[365px]:gap-4">
              <label
                htmlFor="channelsSelect"
                aria-hidden="true"
                className="hidden"
              >
                채널 선택:
              </label>
              <select
                name="channelsSelect"
                id="channelsSelect"
                className="w-[100px] pl-4 text-sm max-[365px]:w-[90px] max-[365px]:text-sm"
                ref={channelsRef}
                tabIndex="0"
              >
                <option value="일상방">일상방 🌉</option>
                <option value="맛집방">맛집방 🍕</option>
                <option value="취업방">취업방 🧑🏻‍💻</option>
                <option value="힐링방">힐링방 ☘️</option>
              </select>
              <button
                type="button"
                className="text-lionly-sm-bold text-lionly-gray-3 hover:text-lionly-black"
                onClick={handleTextDelete}
              >
                전체 삭제
              </button>
            </div>
          </div>

          <label htmlFor="content" aria-hidden="true" className="hidden">
            게시물 내용:
          </label>
          <textarea
            name="content"
            placeholder="글을 작성해주세요.✏️"
            className="w-full flex-1 resize-none border-none placeholder:pt-[10%] placeholder:text-center focus:outline-none"
            maxLength={textareaMaxLength}
            onChange={handleInputCount}
            ref={textareaRef}
            aria-labelledby="content"
          ></textarea>
        </div>
      </main>
    </motion.div>
  );
}

export default Writing;
