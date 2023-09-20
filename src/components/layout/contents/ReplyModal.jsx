import { useContent, useCreateComment } from '@/hooks';
import { handlePreventTabControl } from '@/utils';
import { bool, object } from 'prop-types';

function ReplyModal({ data, state }) {
  const { replyInputRef, handleSubmitComment } = useCreateComment(data);
  const { openModal, setOpenModal } = useContent();
  const handleInputReply = (e) => {
    const textarea = e.currentTarget;
    textarea.style.height = '';
    textarea.style.height = textarea.scrollHeight + 'px';

    e.target.maxLength < e.target.value.length
      ? (e.target.value = e.target.value.slice(0, e.target.maxLength))
      : null;
  };

  if (openModal === true) {
    replyInputRef.current.style.height = '';
    replyInputRef.current.focus();
  }

  return (
    <div
      aria-hidden={openModal ? false : true}
      role="dialog"
      aria-labelledby="replyModal"
      className={`${
        state ? 'visible w-2/3' : 'invisible w-0'
      } absolute bottom-[20%] left-1/2 z-10 -translate-x-[50%] border-2 border-lionly-gray-2 transition-all duration-200`}
    >
      <form
        id="insertReplyForm"
        onSubmit={(e) => handleSubmitComment(e, 'reply')}
        className="flex h-full flex-col"
      >
        <label id="replyModal" htmlFor="insertReply"></label>
        <textarea
          tabIndex={0}
          ref={replyInputRef}
          id="insertReply"
          name="reply"
          form="insertReplyForm"
          rows="2"
          maxLength="100"
          onInput={handleInputReply}
          placeholder="답글을 입력해주세요."
          onKeyDown={(e) => handlePreventTabControl(e, true)}
          className="w-full resize-none overflow-hidden p-2 text-lionly-md"
        />
        <div className="z-10 flex justify-around bg-lionly-gray-1 py-3">
          <button
            role="button"
            aria-label="답글 달기"
            type="submit"
            className="w-1/3 self-center rounded-full border bg-lionly-gray-3 p-2 text-lionly-sm-bold text-lionly-white"
          >
            작성하기
          </button>
          <button
            role="button"
            aria-label="취소 달기"
            type="reset"
            onKeyDown={(e) => handlePreventTabControl(e)}
            onClick={() => {
              setOpenModal(false);
            }}
            className="w-1/3 self-center rounded-full border bg-lionly-gray-3 p-2 text-lionly-sm-bold text-lionly-white"
          >
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
}

ReplyModal.propTypes = {
  data: object,
  state: bool,
  value: object,
};

export default ReplyModal;
