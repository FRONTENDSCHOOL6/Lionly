import { useComments, useReply } from '@/hooks';
import { handlePreventTabControl } from '@/utils';
import { bool, object } from 'prop-types';

function ReplyModal({ data, state }) {
  const { handleSubmitReply, replyInputRef } = useComments(data);
  const { openModal, setOpenModal } = useReply();

  if (openModal === true) {
    replyInputRef.current.focus();
  }

  return (
    <div
      aria-hidden={openModal ? false : true}
      role="dialog"
      aria-labelledby="replyModal"
      className={`${
        state ? 'visible h-[150px] w-2/3' : 'invisible h-0 w-0'
      } absolute bottom-[20%] left-1/2 z-10 -translate-x-[50%] border-2 border-lionly-gray-2 transition-all duration-200`}
    >
      <form onSubmit={handleSubmitReply}>
        <label id="replyModal" htmlFor="insertReply"></label>
        <input
          tabIndex={0}
          type="text"
          ref={replyInputRef}
          id="insertReply"
          name="reply"
          placeholder="답글을 입력해주세요."
          onKeyDown={(e) => handlePreventTabControl(e, true)}
          className="preventCloseModal h-[100px] w-full whitespace-normal pl-3 text-lionly-md"
        />
        <div className="preventCloseModal flex h-[46px] justify-center gap-x-10 bg-lionly-gray-1 p-1">
          <button
            role="button"
            aria-label="답글 달기"
            type="submit"
            className="h-5/6 w-1/3 self-center rounded-full border bg-lionly-gray-3 p-2 text-lionly-sm-bold text-lionly-white"
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
            className="h-5/6 w-1/3 self-center rounded-full border bg-lionly-gray-3 p-2 text-lionly-sm-bold text-lionly-white"
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
