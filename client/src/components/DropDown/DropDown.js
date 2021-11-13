import React, { useState, useEffect } from 'react';
import Withdrawal from '../Withdrawal/Withdrawal';
import './DropDown.scss';
// import { OutsideClick } from './OutsideClick';

// const dropdownRef = useRef(null);
// const [isActive, setIsActive] = OutsideClick(dropdownRef, false);
// const onClick = () => setIsActive(!isActive);

const DropDown = ({ dropdownRef, isActive }) => {
  const [openWithdrawal, setOpenWithdrawal] = useState(false);
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
        {clicked ? (
          <div className="tab_clicked">{openWithdrawal && <Withdrawal />}</div>
        ) : (
          <div
            className="tab"
            onClick={() => {
              setClicked(true);
              setTimeout(() => {
                setOpenWithdrawal(true);
              }, 500);
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
