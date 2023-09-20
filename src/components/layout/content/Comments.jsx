import getContent from '@/api/getContent';
import pb from '@/api/pocketbase';
import { ProfileImage } from '@/components/button';
import { useDeleteComment, useModal, useReply } from '@/hooks';
import useStorageData from '@/hooks/useStorageData';
import { calcTimeDifference } from '@/utils';
import { object } from 'prop-types';
import { useEffect } from 'react';
import ReplyModal from './ReplyModal';
import { ReactComponent as TrashCan } from '/src/assets/trashCan_Contents.svg';

function Comments({ data }) {
  const { comments, setComments } = useModal(data);
  const { handleDeleteComment } = useDeleteComment(data);
  const storageData = useStorageData();
  const { openModal, handleOpenModal } = useReply();

  useEffect(() => {
    (async function subscribeComments() {
      await pb.collection('feeds').subscribe('*', async ({ action }) => {
        if (action === 'update') {
          const content = await getContent(data?.id);
          setComments(content.expand.comments);
        }
        scrollTo({
          top: 1000000,
          behavior: 'smooth',
        });
      });
    })();

    (async function subscribeReply() {
      await pb.collection('comments').subscribe('*', async ({ action }) => {
        if (action === 'update') {
          const content = await getContent(data?.id);
          setComments(content.expand.comments);
        }
      });
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="px-4">
      <h4 className="sr-only">Comments</h4>
      <ul className="flex flex-col gap-y-3">
        <ReplyModal data={data} state={openModal} />

        {comments &&
          comments.map((comment, index) => (
            <li key={comment.id} className="relative flex flex-col">
              <div className="flex gap-x-3">
                <ProfileImage
                  nickname={comment.expand.commenter.nickname}
                  imageName={[
                    comment.expand.commenter.id,
                    comment.expand.commenter.profile_image,
                  ]}
                />
                <div className="flex flex-col gap-y-px">
                  <div className="flex gap-x-2">
                    <span className="text-lionly-sm-bold">
                      {comment.expand.commenter.nickname}
                    </span>
                    <span className="text-lionly-sm text-lionly-gray-2">
                      {calcTimeDifference(comment.created)}
                    </span>
                    {storageData.id === comment.expand.commenter.id ? (
                      <TrashCan
                        tabIndex="0"
                        role="button"
                        type="button"
                        onClick={() =>
                          handleDeleteComment('comments', comment.id)
                        }
                        className="w-3 fill-lionly-primary-color transition-all hover:scale-125 focus:scale-125"
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
                    onKeyDown={(e) => handleOpenModal(e, data)}
                    onClick={(e) => handleOpenModal(e, data)}
                    className="w-fit cursor-pointer text-lionly-sm text-lionly-gray-2"
                  >
                    답글 달기
                  </span>
                </div>
              </div>
              {comment.expand.reply && (
                <ul>
                  {comment.expand.reply.map((reply) => (
                    <li key={reply.id} className="ml-12 mt-3 flex gap-x-3">
                      <ProfileImage
                        nickname={reply.expand.commenter.nickname}
                        imageName={[
                          reply.expand.commenter.id,
                          reply.expand.commenter.profile_image,
                        ]}
                      />

                      <div className="flex flex-col gap-y-px">
                        <div className="flex gap-x-2">
                          <span className="text-lionly-sm-bold">
                            {reply.expand.commenter.nickname}
                          </span>

                          <span className="text-lionly-sm text-lionly-gray-2">
                            {calcTimeDifference(reply.created)}
                          </span>
                          {storageData.id === comment.expand.commenter.id ? (
                            <TrashCan
                              tabIndex="0"
                              role="button"
                              type="button"
                              onClick={() =>
                                handleDeleteComment('reply', reply.id)
                              }
                              className="w-3 fill-lionly-primary-color transition-all hover:scale-125 focus:scale-125"
                            />
                          ) : null}
                        </div>

                        <p className="text-lionly-sm">{reply.comment}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
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