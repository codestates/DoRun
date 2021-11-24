import React, { useState } from 'react';
import MyAccountClicked from './MyAccountClicked';
import './MyAccount.scss';

const MyAccount = () => {
  const [focused, setFocused] = useState('');
  const [clicked, setClicked] = useState(false);

  return (
    <div className={`card${focused}`}>
      <div
        className="card_wrapper"
        onClick={() => {
          setFocused('_focused'),
            setTimeout(() => {
              setClicked(true);
            }, 500);
        }}
      >
        <div className="card_left">
          <img className="card_img" src="/MyAccount.png" alt="Card Img" />
        </div>
        <div className="card_right">
          <h2 className="card_title">My Account</h2>
          <div className="card_content">개인정보 수정 및 비밀번호 변경</div>
        </div>
      </div>
      {clicked && (
        <>
          <MyAccountClicked />
          <div
            className="content_opened"
            onClick={() => {
              setFocused(''), setClicked(false);
            }}
          >
            <img className="content_close" src="/close.png" alt="close" />
          </div>
        </>
      )}
    </div>
  );
};

export default MyAccount;
