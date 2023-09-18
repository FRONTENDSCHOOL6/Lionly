import { ReactComponent as UpArrowSVG } from '@/assets/arrow_Feed_up.svg';
import { ProfileImage } from '@/components/button';
import useComments from '@/hooks/useComments';
import { object } from 'prop-types';

function WriteComment({ data }) {
  const { commentInputRef, storageData, handleSubmitComment } =
    useComments(data);
  const { id, nickname, profile_image } = storageData;

  return (
    <section className="sticky bottom-0 bg-lionly-white px-4 py-[18px]">
      <form
        onSubmit={handleSubmitComment}
        className="flex items-center gap-x-2"
      >
        <label htmlFor="writeComment">
          <h3 className="sr-only">댓글 달기</h3>
          <ProfileImage nickname={nickname} imageName={[id, profile_image]} />
        </label>
        <input
          ref={commentInputRef}
          id="writeComment"
          name="comment"
          type="text"
          placeholder={`${nickname}(으)로 댓글 달기`}
          maxLength={250}
          onInput={(e) =>
            e.target.maxLength < e.target.value.length
              ? (e.target.value = e.target.value.slice(0, e.target.maxLength))
              : null
          }
          className="w-full rounded-full border px-5 py-2"
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

WriteComment.propTypes = {
  data: object,
};

export default WriteComment;
