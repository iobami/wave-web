import { useEffect, useState, useRef } from 'react';

export default function useOutsideClick(initialState, outerRef) {
  const ref = useRef(null);
  const [show, setShow] = useState(initialState);

  useEffect(() => {
    function handleClickOutside(event) {
      if (outerRef.current.contains(event.target)) return;
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [outerRef]);

  return [show, setShow, ref];
}
