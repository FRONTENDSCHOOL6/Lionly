import { useRef } from 'react';

function useUploadImage() {
  const imageInput = useRef(null);
  const uploadImageRef = useRef(null);

  const handleImageUpload = () => {
    imageInput.current.click();
  };
  const handleUploadImg = (e) => {
    const imgFile = e.target.files[0];
    const imgUrl = URL.createObjectURL(imgFile);
    uploadImageRef.current.style.backgroundImage = `url('${imgUrl}')`;
  };
  return { imageInput, uploadImageRef, handleImageUpload, handleUploadImg };
}

export default useUploadImage;
