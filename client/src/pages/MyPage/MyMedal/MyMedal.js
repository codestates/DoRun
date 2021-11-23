import React, { useState } from 'react';
import MyMedalClicked from './MyMedalClicked';
import './MyMedal.scss';

const MyMedal = () => {
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
          <img className="card_img" src="/MyMedal.png" alt="Card Img" />
        </div>
        <div className="card_right">
          <h2 className="card_title">My Medal</h2>
          <div className="card_content">획득한 메달 확인</div>
        </div>
      </div>
      {clicked && (
        <>
          <MyMedalClicked />
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

export default MyMedal;
