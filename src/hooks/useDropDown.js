import { useState, useRef, useEffect } from 'react';

function useDropDown() {
  const [view, setView] = useState(false);
  const ref = useRef(null);

  const removeHandler = () => {
    setView(!view);
  };

  useEffect(() => {
    const handleDropOut = (e) => {
      if (view && !ref.current.contains(e.target)) {
        setView(!view);
      }
    };

    document.addEventListener('mousedown', handleDropOut);

    return () => {
      document.removeEventListener('mousedown', handleDropOut);
    };
  }, [ref.current]);

  return [view, ref, removeHandler];
}

export default useDropDown;
