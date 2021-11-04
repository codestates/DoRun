import React, { useState, useEffect } from 'react';
import './DropDown.scss';
<<<<<<< HEAD

=======
import Withdrawal from '../Withdrawal/Withdrawal';
>>>>>>> f4d975fba6916e3a2a809d30ed12c866fa7dba03
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
        className={`menu ${isActive ? 'active' : 'inactive'} ${clicked ? 'clicked' : 'unclicked'
          }`}
      >
        {clicked ? (
          <div className="tab_clicked">
            <div className="tab_header">DoRun 회원탈퇴</div>
            <Withdrawal />
          </div>
        ) : (
          <div
            className="tab"
            onClick={() => {
              setClicked(true);
            }}
          >
            회원탈퇴
          </div>
        )}
      </nav>
    </div>
  );
};

export default DropDown;
