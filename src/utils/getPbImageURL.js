export const getPbImageURL = (item, fileName = 'image') => {
  if (item[fileName]) {
    return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${
      item.id
    }/${item[fileName]}`;
  } else {
    return null;
  }
};
