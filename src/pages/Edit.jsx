import pb from '@/api/pocketbase';
import Spinner from '@/components/Spinner';
import renderImg from '@/utils/getImageData';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import plus from '@/assets/PlusButton_Writing.svg';
import { maxLengthCheck } from '@/utils/maxLengthCheck';
import { useCallback } from 'react';
import useIsLogin from '@/contexts/AuthProvider';
import { motion } from 'framer-motion';

function Edit() {
  useIsLogin();
  const { postId } = useParams();
  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [changeImage, setChangeImage] = useState(null);
  const fileInputRef = useRef(null);
  const channelsRef = useRef(null);
  const [textLength, setTextLength] = useState(0);
  const [textValue, setTextValue] = useState('');
  const navigate = useNavigate();

  // 수정할 feeds의 필드 값들 구하기
  useEffect(() => {
    async function fetchData() {
      const responseData = await pb.collection('feeds').getOne(postId);
      setData(responseData);
      if (textValue === '') {
        setTextValue(responseData.text);
        setTextLength(responseData.text.length);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // text 없을 시 select 만 랜더링 되게 만들기.
    if (data && channelsRef.current) {
      // data와 select 엘리먼트 모두 존재하는 경우
      channelsRef.current.value = data.channels; // data.channels 값으로 select 옵션 설정
    }
  }, [data]);

  const handleButtonClick = useCallback(() => {
    // 버튼 클릭 시 file input을 트리거
    fileInputRef.current.click();
  }, []);

  const handleFileUpload = useCallback(async (e) => {
    const renderfile = e.target.files[0];
    setChangeImage(renderfile);

    if (renderfile) {
      setSelectedImage(URL.createObjectURL(renderfile)); // 선택된 이미지의 URL 생성
    }
  }, []);

  const handleUpdateClick = useCallback(async () => {
    if (textValue === '') {
      toast.error('텍스트를 입력해 주세요.');
      return;
    }
    if (changeImage === null && textValue) {
      await pb.collection('feeds').update(data.id, {
        text: textValue,
        channels: channelsRef.current.value,
      });
    } else if (changeImage && textValue === null) {
      await pb.collection('feeds').update(data.id, {
        feed_image: changeImage,
        channels: channelsRef.current.value,
      });
    } else if (changeImage && textValue) {
      await pb.collection('feeds').update(data.id, {
        feed_image: changeImage,
        text: textValue,
        channels: channelsRef.current.value,
      });
    }
    toast.success('게시글이 성공적으로 수정 되었습니다!');
    navigate('/mypage');
    window.location.reload(); //리로드 직접 안해주면 feed가서 사용자가 다시 새로고침 해야함
  }, [navigate, textValue, changeImage]);

  const handleTextChange = useCallback((e) => {
    setTextValue(e.target.value);
    maxLengthCheck(e.target);
    setTextLength(e.target.value.length);
  }, []);

  const handleDeleteAllClick = useCallback(() => {
    setTextValue('');
    setTextLength(0);
  });

  return (
    <>
      <Helmet>
        <title>Lionly - Edit</title>
      </Helmet>

      {data ? (
        <motion.div
          className="flex h-screen w-full flex-1 flex-col"
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
          <header className="mb-4 mt-4 flex w-full justify-between">
            <button
              className="ml-3 h-7 w-12 rounded-xl border border-lionly-white pt-[1px] text-lionly-sm-bold text-lionly-white hover:bg-lionly-secondary-color"
              onClick={() => {
                navigate('/mypage');
              }}
            >
              취소
            </button>
            <button
              className="mr-3 h-7 w-12 rounded-xl border border-lionly-white pt-[1px] text-lionly-sm-bold text-lionly-white hover:bg-lionly-secondary-color"
              onClick={() => {
                handleUpdateClick();
              }}
            >
              완료
            </button>
          </header>
          <main>
            <div
              className="flex aspect-[9/4] w-full items-end justify-end rounded-xl  bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${
                  selectedImage || renderImg('feeds', data.id, data.feed_image)
                })`,
              }}
            >
              <h3 className="sr-only">로그인 된 사용자 게시물</h3>
              <button
                className="mx-auto mb-4 h-10 w-[130px] rounded-full border  border-lionly-white text-lionly-sm-bold text-lionly-white hover:bg-lionly-secondary-color"
                onClick={handleButtonClick}
              >
                <img
                  src={plus}
                  alt="사진 변경하기 버튼"
                  className="inline pr-1"
                />{' '}
                사진 변경하기
              </button>
            </div>
            <input
              type="file"
              className=" hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </main>
          <footer className="flex  w-full flex-grow flex-col">
            <div className="w-full rounded-t-xl bg-lionly-white ">
              <div className="flex justify-between p-6">
                <div>
                  <h2 className="inline" tabIndex="0">
                    게시물 수정
                  </h2>
                  <div className="ml-3 inline text-xl font-thin">
                    {/* assertlive로 글자 수 변경때마다 현재 글자 수 말해주기 */}
                    <span
                      className="text-lionly-base font-thin text-lionly-red "
                      aria-live="assertive"
                    >
                      {textLength}
                    </span>
                    <span
                      className="text-lionly-base font-thin text-lionly-gray-3"
                      aria-label="최대 글자 수 200"
                      tabIndex="0"
                    >
                      / 200
                    </span>
                  </div>
                </div>
                <div>
                  <select
                    className="mr-10 w-[100px] pl-4 text-sm"
                    ref={channelsRef}
                    tabIndex="0"
                    aria-label="게시글 채널 선택"
                  >
                    <option value="일상방">일상방 🌉</option>
                    <option value="맛집방">맛집방 🍕</option>
                    <option value="취업방">취업방 🧑🏻‍💻</option>
                    <option value="힐링방">힐링방 ☘️</option>
                  </select>
                  <button
                    className="text-lionly-sm-bold text-lionly-gray-3 hover:text-lionly-black"
                    onClick={handleDeleteAllClick}
                  >
                    전체 삭제
                  </button>
                </div>
              </div>
            </div>
            <textarea
              className="w-full flex-grow resize-none rounded-b-xl p-6 placeholder:pt-[10%] placeholder:text-center focus:outline-none"
              placeholder="글을 작성해주세요.✏️"
              maxLength="200"
              value={textValue}
              onChange={handleTextChange}
            />
          </footer>
        </motion.div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <Spinner size={200} />
        </div>
      )}
    </>
  );
}

export default Edit;
