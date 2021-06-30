import React, { FC, useRef } from 'react';
import useHideComponent from '../../hooks/useHideComponent';
import {
  ShowComponentSetValue,
  ShowComponentValue,
} from '../../hooks/useShowComponent';

interface Props {
  setIsComponentActive: ShowComponentSetValue;
  show: ShowComponentValue;
  render: (show: ShowComponentValue) => JSX.Element | false;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
const OutsiderAlert: FC<Props> = ({
  children,
  setIsComponentActive,
  show,
  render,
  style,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useHideComponent(wrapperRef, setIsComponentActive, show);
  return (
    <div ref={wrapperRef} style={{ ...style }}>
      {children}
      {render(show)}
    </div>
  );
};

export default OutsiderAlert;
