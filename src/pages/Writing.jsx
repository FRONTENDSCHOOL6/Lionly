import { ReactComponent as LeftArrow } from '@/assets/leftarrow.svg';
import { Helmet } from 'react-helmet-async';
import { useRef, useState } from 'react';
import { maxLengthCheck } from '@/utils/maxLengthCheck';

function Writing() {
  const imageInput = useRef();
  const [inputCount, setInputCount] = useState(0);

  const handleImageUpload = () => {
    imageInput.current.click();
  };

  const handleInputCount = (e) => {
    setInputCount(e.target.value.length);
    if (setInputCount.length > 200) {
      maxLengthCheck(inputCount.current);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Lionly - Writing</title>
      </Helmet>
      <div className="mt-4 flex justify-between">
        <LeftArrow className="cursor-pointer" />
        <button
          type="submit"
          className="rounded-full border border-lionly-white px-3 py-[7px] text-lionly-sm text-lionly-white"
        >
          등록
        </button>
      </div>
      <div>
        <input type="file" className="sr-only" ref={imageInput} />
        <button
          className="my-[106px] w-[130px] rounded-full bg-lionly-secondary-color px-4 py-[11px] text-lionly-sm-bold text-lionly-white"
          onClick={handleImageUpload}
        >
          사진 추가하기
        </button>
        <div className="w-full rounded-xl bg-lionly-white px-[35px]">
          <div className="flex justify-between pt-[23px]">
            <div className="flex gap-2">
              <h2>게시물 작성</h2>
              <span className="font-thin text-lionly-red">{inputCount}</span>
              <span className="text-lionly-base font-thin text-lionly-gray-3">
                / 200
              </span>
            </div>
            <div className="flex gap-10">
              <select className="w-[100px] pl-4 text-sm outline-none">
                <option value="일상방">일상방 🌉</option>
                <option value="맛집방">맛집방 🍕</option>
                <option value="취업방">취업방 🧑🏻‍💻</option>
                <option value="힐링방">힐링방 ☘️</option>
              </select>
              <button
                type="button"
                className="text-lionly-sm-bold text-lionly-gray-3"
              >
                전체 삭제
              </button>
            </div>
          </div>
          <textarea
            name="content"
            placeholder="글을 작성해주세요."
            className="h-screen w-full resize-none rounded-xl border-none placeholder:pt-[50%] placeholder:text-center focus:outline-none"
            maxLength="200"
            onChange={handleInputCount}
          ></textarea>
          <span className="글을 작성해주세요"></span>
        </div>
      </div>
    </div>
  );
}

export default Writing;
