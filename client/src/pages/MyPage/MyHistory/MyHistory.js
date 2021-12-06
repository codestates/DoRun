import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import MyHistoryClicked from './MyHistoryClicked';
import './MyHistory.scss';
import { checkUserLog } from '../../../_actions/user_action';
import reactDom from 'react-dom';

const MyHistory = () => {
  const [focused, setFocused] = useState('');
  const [clicked, setClicked] = useState(false);

  //* My History 기록 로드
  const [filteredLog, setFilteredLog] = useState([]);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    const log = [];
    // axios.get(`${process.env.REACT_APP_SERVER}/user/${userId}`).then((res) => {
    //   if (res.data.data.log) {
    //     res.data.data.log.map((el) => log.push(el));
    //     log.map((el) => filteredLog.push(el.split('/-/')));
    //   }
    // });

    dispatch(checkUserLog(userId))
      .then((res) => {
        // console.log('메달 응답', res.payload.log)
        res.payload.log.map((el) => log.push(el));
        log.map((el) => filteredLog.push(el.split('/-/')));

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
          <img className="card_img" src="/MyHistory.png" alt="Card Img" />
        </div>
        <div className="card_right">
          <h2 className="card_title">My History</h2>
          <div className="card_content">DoRun 기록 확인</div>
        </div>
      </div>
      {clicked && (
        <>
          <MyHistoryClicked filteredLog={filteredLog} />
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

export default MyHistory;
