import { useRef, useEffect } from 'react';

function useDropDown() {
  const ref = useRef(null);

  useEffect(() => {
    const handleModalOut = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log('외부 클릭 감지');
      }
    };

    document.addEventListener('click', handleModalOut);

    return () => {
      document.removeEventListener('click', handleModalOut);
    };
  });
  return ref;
}

export default useDropDown;
