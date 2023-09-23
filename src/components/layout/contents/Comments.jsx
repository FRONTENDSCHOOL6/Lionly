import { useContent } from '@/contexts/Content';
import { useDeleteComment, useStorageData } from '@/hooks';
import { calcTimeDifference } from '@/utils';
import { object } from 'prop-types';
import { useState } from 'react';
import { ProfileImage } from '..';
import ReplyModal from './ReplyModal';
import { ReactComponent as TrashCan } from '/src/assets/trashCan_Contents.svg';

function Comments({ data }) {
  const { handleDeleteComment } = useDeleteComment(data);

  const [openModal, setOpenModal] = useState(false);
  const { setSelectedComment } = useContent();
  const handleOpenModal = (e) => {
    if (openModal === false && (e.key === 'Enter' || e.type === 'click')) {
      const targetIndex = e.target.id.slice(-1);

      setSelectedComment({
        id: data.expand.comments[targetIndex].id,
        nickname: data.expand.comments[targetIndex].commenterNickname,
        reply: data.expand.comments[targetIndex].reply,
      });

      setOpenModal(true);
    }
    return;
  };
  const storageData = useStorageData();

  return (
    <section className="px-4">
      <h4 className="sr-only">Comments</h4>
      <ReplyModal openModal={openModal} setOpenModal={setOpenModal} />
      <ul className="relative flex flex-col gap-y-3">
        {data.expand.comments &&
          data.expand.comments?.map((comment, index) => (
            <li key={comment.id} className="relative flex flex-col">
              <div className="flex gap-x-3">
                <ProfileImage
                  nickname={comment.expand?.commenter.nickname}
                  imageName={[
                    comment.commenter,
                    comment.expand?.commenter.profile_image,
                  ]}
                />
                <div className="flex flex-col gap-y-px">
                  <div className="flex gap-x-2">
                    <span className="text-lionly-sm-bold">
                      {comment.expand?.commenter.nickname}
                    </span>
                    <span className="text-lionly-sm text-lionly-gray-2">
                      {calcTimeDifference(comment.created)}
                    </span>
                    {storageData.id === comment.commenter ? (
                      <TrashCan
                        tabIndex="0"
                        role="button"
                        type="button"
                        onClick={() =>
                          handleDeleteComment('comments', comment.id)
                        }
                        className="w-3 fill-lionly-primary-color transition-all hover:scale-125"
                      />
                    ) : null}
                  </div>

                  <p className="text-lionly-sm">{comment.comment}</p>

                  <span
                    id={`writeReply${index}`}
                    tabIndex="0"
                    role="button"
                    aria-haspopup="true"
                    aria-pressed={openModal ? true : false}
                    onKeyDown={(e) => handleOpenModal(e, comment)}
                    onClick={(e) => handleOpenModal(e, comment)}
                    className="w-fit cursor-pointer text-lionly-sm text-lionly-gray-2"
                  >
                    답글 달기
                  </span>
                </div>
              </div>

              <ul>
                {comment.expand?.reply?.map((reply) => (
                  <li key={reply.id} className="ml-12 mt-3 flex gap-x-3">
                    <ProfileImage
                      nickname={reply.expand?.commenter.nickname}
                      imageName={[
                        reply.commenter,
                        reply.expand?.commenter.profile_image,
                      ]}
                    />

                    <div className="flex flex-col gap-y-px">
                      <div className="flex gap-x-2">
                        <span className="text-lionly-sm-bold">
                          {reply.expand?.commenter.nickname}
                        </span>

                        <span className="text-lionly-sm text-lionly-gray-2">
                          {calcTimeDifference(reply.created)}
                        </span>
                        {storageData.id === reply.commenter ? (
                          <TrashCan
                            tabIndex="0"
                            role="button"
                            type="button"
                            onClick={() =>
                              handleDeleteComment('reply', reply.id)
                            }
                            className="w-3 fill-lionly-primary-color transition-all hover:scale-125"
                          />
                        ) : null}
                      </div>

                      <p className="text-lionly-sm">{reply.comment}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </section>
  );
}

Comments.propTypes = {
  data: object,
};

export default Comments;
