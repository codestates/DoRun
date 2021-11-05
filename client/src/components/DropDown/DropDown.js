import React, { useState, useEffect } from 'react';
import './DropDown.scss';

// import { OutsideClick } from './OutsideClick';

// const dropdownRef = useRef(null);
// const [isActive, setIsActive] = OutsideClick(dropdownRef, false);
// const onClick = () => setIsActive(!isActive);

const DropDown = ({ dropdownRef, isActive }) => {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (!isActive) setClicked(false);
  }, [isActive]);
  return (
    <div className="DropDown">
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? 'active' : 'inactive'} ${
          clicked ? 'clicked' : 'unclicked'
        }`}
      >
        <div
          onClick={() => {
            setClicked(true);
          }}
        >
          회원탈퇴
        </div>
      </nav>
    </div>
  );
};

export default DropDown;
