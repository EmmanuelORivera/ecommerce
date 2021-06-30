import React, { useEffect } from 'react';
import type {
  ShowComponentSetValue,
  ShowComponentValue,
} from './useShowComponent';

type Ref = React.MutableRefObject<HTMLDivElement | null>;

const useHideComponent = (
  ref: Ref,
  setShow: ShowComponentSetValue,
  show: ShowComponentValue
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && show) {
        setShow((prevShow) => !prevShow);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setShow, show]);
};

export default useHideComponent;
