import { ReactComponent as UpArrowSVG } from '@/assets/arrow_Feed_up.svg';
import { ProfileImage } from '@/components/button';
import { useContent, useCreateComment } from '@/hooks';
import useStorageData from '@/hooks/useStorageData';

function InsertComment() {
  const storageData = useStorageData();
  const { contentData } = useContent();
  const { id, nickname, profile_image } = storageData;
  const { commentInputRef, handleSubmitComment } =
    useCreateComment(contentData);
  const handleInputComment = (e) => {
    const textarea = e.currentTarget;
    textarea.style.height = '';
    textarea.style.height = textarea.scrollHeight + 'px';
    textarea.style.transform = 'translateY(40px)';
    textarea.style.marginTop = -textarea.scrollHeight + 'px';

    e.target.maxLength < e.target.value.length
      ? (e.target.value = e.target.value.slice(0, e.target.maxLength))
      : null;
  };
  return (
    <section className="sticky bottom-0 bg-lionly-white px-4 py-[18px]">
      <form
        id="insertCommentForm"
        onSubmit={(e) => handleSubmitComment(e, 'comments')}
        className="flex justify-center gap-x-2"
      >
        <label htmlFor="insertComment">
          <h4 className="sr-only">댓글 달기</h4>
          <ProfileImage nickname={nickname} imageName={[id, profile_image]} />
        </label>
        <textarea
          ref={commentInputRef}
          id="insertComment"
          form="insertCommentForm"
          name="comment"
          rows="1"
          onInput={handleInputComment}
          placeholder={`${nickname}(으)로 댓글 달기`}
          maxLength={100}
          className="peer h-10 w-full resize-none overflow-hidden rounded-3xl border border-lionly-gray-3 px-5 py-2 placeholder:text-center"
        />
        <button
          role="button"
          aria-label="댓글 쓰기"
          type="submit"
          className="h-7 w-7 self-center rounded-full shadow-lg"
        >
          <UpArrowSVG className="h-7 w-7 rounded-full shadow-lg transition-all hover:scale-125 focus:scale-125" />
        </button>
      </form>
    </section>
  );
}

export default InsertComment;
