import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MyMedalClicked from './MyMedalClicked';
import './MyMedal.scss';
import { checkUserLog } from '../../../_actions/user_action';

const MyMedal = () => {
  const [focused, setFocused] = useState('');
  const [clicked, setClicked] = useState(false);
  const [userMedalLog, setUserMedalLog] = useState([]);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    const userLog = [];
    dispatch(checkUserLog(userId))
      .then((res) => {
        res.payload.log.map((el) => userLog.push(el));
        userLog.map((el) => userMedalLog.push(el.split('/-/')));
      })
      .catch((e) => console.log(e));
  }, []);


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
          <img className="card_img" src="MyMedal/MyMedal.png" alt="Card Img" />
        </div>
        <div className="card_right">
          <h2 className="card_title">My Medal</h2>
          <div className="card_content">획득한 메달 확인</div>
        </div>
      </div>
      {clicked && (
        <>
          <MyMedalClicked userMedalLog={userMedalLog} />
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
