import { ReactComponent as UpArrowSVG } from '@/assets/arrow_Feed_up.svg';
import { ProfileImage } from '@/components/button';
import { useComments } from '@/hooks';
import { object } from 'prop-types';

function InsertComment({ data }) {
  const { commentInputRef, storageData, handleSubmitComment } =
    useComments(data);
  const { id, nickname, profile_image } = storageData;
  const handleSliceLastValue = (e) => {
    e.target.maxLength < e.target.value.length
      ? (e.target.value = e.target.value.slice(0, e.target.maxLength))
      : null;
  };

  return (
    <section className="sticky bottom-0 bg-lionly-white px-4 py-[18px]">
      <form
        onSubmit={handleSubmitComment}
        className="flex items-center justify-center gap-x-2"
      >
        <label htmlFor="insertComment">
          <h3 className="sr-only">댓글 달기</h3>
          <ProfileImage nickname={nickname} imageName={[id, profile_image]} />
        </label>
        <input
          ref={commentInputRef}
          id="insertComment"
          name="comment"
          type="text"
          placeholder={`${nickname}(으)로 댓글 달기`}
          maxLength={250}
          onInput={handleSliceLastValue}
          className="peer w-full rounded-full border border-lionly-gray-3 px-5 py-2 placeholder:text-center"
        />
        <button
          role="button"
          aria-label="댓글 쓰기"
          type="submit"
          className="h-7 w-7 rounded-full shadow-lg"
        >
          <UpArrowSVG className="h-7 w-7 rounded-full shadow-lg transition-all hover:scale-125 focus:scale-125" />
        </button>
      </form>
    </section>
  );
}

InsertComment.propTypes = {
  data: object,
};

export default InsertComment;