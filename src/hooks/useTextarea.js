import { maxLengthCheck } from '@/utils';
import { useRef, useState } from 'react';

function useTextarea() {
  const [inputCount, setInputCount] = useState(0);
  const textareaRef = useRef(null);

  const handleInputCount = (e) => {
    maxLengthCheck(e.target);
    setInputCount(e.target.value.length);
  };

  const handleTextDelete = () => {
    textareaRef.current.value = '';
    setInputCount(0);
  };

  return {
    inputCount,
    textareaRef,
    handleInputCount,
    handleTextDelete,
  };
}

export default useTextarea;
