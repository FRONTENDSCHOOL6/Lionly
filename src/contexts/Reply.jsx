import { node, string } from 'prop-types';
import { createContext, useState } from 'react';

export const ReplyContext = createContext({});

function ReplyProvider({ displayName = 'ReplyContext', children }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});

  const handleOpenModal = (e, data) => {
    const commentIndex = e.target.id.slice(-1);

    if (openModal === false) {
      if (e.key === 'Enter' || e.type === 'click') {
        setOpenModal(true);
      }

      setSelectedComment({
        id: data?.expand.comments[commentIndex]?.id,
        nickname:
          data?.expand.comments[commentIndex]?.expand.commenter.nickname,
        reply: data?.expand.comments[commentIndex]?.reply,
      });

      scrollTo({ top: 10000 });
      return;
    }
  };

  return (
    <ReplyContext.Provider
      displayName={displayName}
      value={{
        openModal,
        setOpenModal,
        selectedComment,
        setSelectedComment,
        handleOpenModal,
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
