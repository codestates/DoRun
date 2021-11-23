import React, { useState } from 'react';
import MyDoRunClicked from './MyDoRunClicked';
import './MyDoRun.scss';

const MyDoRun = () => {
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
          <img className="card_img" src="/MyDoRun.png" alt="Card Img" />
        </div>
        <div className="card_right">
          <h2 className="card_title">My DoRun</h2>
          <div className="card_content">크루정보 확인 및 크루채팅</div>
        </div>
      </div>
      {clicked && (
        <>
          <MyDoRunClicked />
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

export default MyDoRun;
