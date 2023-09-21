import getContent from '@/api/getContent';
import pb from '@/api/pocketbase';
import { ProfileImage } from '@/components/button';
import { useContent, useDeleteComment } from '@/hooks';
import useStorageData from '@/hooks/useStorageData';
import { calcTimeDifference } from '@/utils';
import { object } from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReplyModal from './ReplyModal';
import { ReactComponent as TrashCan } from '/src/assets/trashCan_Contents.svg';

function Comments({ data }) {
  const contentId = useParams();
  const [openModal, setOpenModal] = useState(false);
  const { contentData, setContentData, setSelectedComment } = useContent();
  const { handleDeleteComment } = useDeleteComment(contentData);
  const storageData = useStorageData();
  const handleOpenModal = (e) => {
    if (openModal === false && (e.key === 'Enter' || e.type === 'click')) {
      const commentIndex = e.target.id.slice(-1);

      setSelectedComment({
        id: contentData?.expand?.comments[commentIndex]?.id,
        nickname:
          contentData?.expand?.comments[commentIndex]?.expand.commenter
            .nickname,
        reply: contentData?.expand?.comments[commentIndex]?.reply,
      });

      setOpenModal(true);
      scrollTo({ top: 10000, behavior: 'smooth' });
    }
    return;
  };

  useEffect(() => {
    (async function subscribeComments() {
      await pb.collection('feeds').subscribe(contentData.id, async () => {
        const content = await getContent(contentId.contentId);
        setContentData(content);
      });
    })();
  }, [contentId.contentId]);

  return (
    <section className="px-4">
      <h4 className="sr-only">Comments</h4>
      <ul className="flex flex-col gap-y-3">
        <ReplyModal
          data={contentData}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />

        {contentData &&
          contentData.expand?.comments?.map((comment, index) => (
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
                    onKeyDown={(e) => handleOpenModal(e, contentData)}
                    onClick={(e) => handleOpenModal(e, contentData)}
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
                          {storageData.id === reply.expand.commenter.id ? (
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
