import { useCreateComment } from '@/hooks';
import { handlePreventTabControl } from '@/utils';
import { bool, func } from 'prop-types';
import { useRef } from 'react';
import { useEffect } from 'react';

function ReplyModal({ openModal, setOpenModal }) {
  const { handleSubmitComment } = useCreateComment();
  const replyInputRef = useRef(null);
  const handleInputReply = (e) => {
    const textarea = e.currentTarget;
    textarea.style.height = '';
    textarea.style.height = textarea.scrollHeight + 'px';

    e.target.maxLength < e.target.value.length
      ? (e.target.value = e.target.value.slice(0, e.target.maxLength))
      : null;
  };

  useEffect(() => {
    if (openModal === true) {
      replyInputRef.current.focus();
      replyInputRef.current.style.height = '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  return (
    <div
      aria-hidden={openModal ? false : true}
      role="dialog"
      aria-labelledby="replyModal"
      className={`${
        openModal ? 'block w-2/3 max-w-[600px]' : 'hidden w-0'
      } fixed bottom-1/3 left-1/2 z-10 -translate-x-[50%] border-2 border-lionly-gray-2`}
    >
      <form
        id="insertReplyForm"
        onSubmit={(e) => handleSubmitComment(e, 'reply', replyInputRef)}
        className="flex h-full flex-col"
      >
        <label id="replyModal" htmlFor="insertReply"></label>
        <textarea
          tabIndex="0"
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
            aria-label="답글 달기"
            type="submit"
            onClick={() => setOpenModal(false)}
            className="w-1/3 self-center rounded-full border bg-lionly-gray-3 p-2 text-lionly-sm-bold text-lionly-white"
          >
            작성하기
          </button>
          <button
            type="button"
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
  openModal: bool,
  setOpenModal: func,
};

export default ReplyModal;
