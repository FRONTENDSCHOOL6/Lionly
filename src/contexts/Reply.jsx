import pb from '@/api/pocketbase';
import { node, string } from 'prop-types';
import { createContext, useState } from 'react';

export const ReplyContext = createContext({});

function ReplyProvider({ displayName = 'ReplyContext', children }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});

  const handleOpenModal = (e, commentId) => {
    if (openModal === false) {
      if (e.key === 'Enter' || e.type === 'click') {
        setOpenModal(true);
      }
      scrollTo({ top: 100000, behavior: 'smooth' });

      (async () => {
        const commentData = await pb.collection('comments').getOne(commentId, {
          expand: 'commenter, reply',
        });

        setSelectedComment({
          id: commentData.id,
          nickname: commentData.expand.commenter.nickname,
          reply: commentData.reply,
        });
      })();

      return;
    }
  };

  return (
    <ReplyContext.Provider
      displayName={displayName}
      value={{
        openModal,
        setOpenModal,
        handleOpenModal,
        selectedComment,
      }}
    >
      {children}
    </ReplyContext.Provider>
  );
}

ReplyProvider.propTypes = {
  displayName: string,
  children: node,
};

export default ReplyProvider;
