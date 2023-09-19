import pb from '@/api/pocketbase';
import { node, string } from 'prop-types';
import { createContext, useState } from 'react';

export const ReplyContext = createContext({});

function ReplyProvider({ displayName = 'ReplyContext', children }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});

  const handleOpenModal = (e, commentId) => {
    if (openModal === false) {
      setOpenModal(true);
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
    } else {
      setOpenModal(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <ReplyContext.Provider
      displayName={displayName}
      value={{
        openModal,
        setOpenModal,
        handleOpenModal,
        handleCloseModal,
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
