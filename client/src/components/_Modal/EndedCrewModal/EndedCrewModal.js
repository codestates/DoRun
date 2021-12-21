import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { withdrawalCrew } from '../../../_actions/crew_action';
import './EndedCrewModal.scss';

// const [isEndedCrewModalOpen, setIsEndedCrewModalOpen] = useState(false);
// const endedCrewModalHandler = () => {
//   isEndedCrewModalOpen ? setIsEndedCrewModalOpen(false) : setIsEndedCrewModalOpen(true);
// };
// { isEndedCrewModalOpen && <EndedCrewModal endedCrewModalHandler={endedCrewModalHandler} /> }

const EndedCrewModal = ({ endedCrewModalHandler }) => {
  //* 유저 정보 및 크루 정보
  const userInfo = useSelector((state) => state.user);
  const [crewInfo, setCrewInfo] = useState('');
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/crew/${userInfo.userCrewId}`)
      .then((res) => setCrewInfo(res.data.data));
  }, []);

  //* 버튼 클릭
  const [record, setRecord] = useState(false);
  const dispatch = useDispatch();

  //* 아니요 버튼
  const noRecorded = () => {
    dispatch(withdrawalCrew(userInfo.userId)).then((res) => {
      if (res.payload.data.message === 'success') {
        endedCrewModalHandler();
      }
    });
  };

  //* 예 버튼
  const recorded = () => {
    dispatch(withdrawalCrew(userInfo.userId)).then((res) => {
      if (res.payload.data.message === 'success') {
        // My History에서 사용할 정보를 user테이블에 patch요청
        let body = {
          userId: userInfo.userId,
          data: `${crewInfo.date}/-/${crewInfo.title}/-/${crewInfo.distance}`,
        };
        axios
          .patch(`${process.env.REACT_APP_SERVER}/user/history`, body)
          .then((res) => {
            if (res.data.message === 'success') {
              setRecord(true);
            }
          });
      }
    });
  };

  return (
    <div className="endedCrew_container">
      <div className="endedCrew">
        {record ? (
          <>
            <div className="endedCrew_body">
              <div className="endedCrew_title">{crewInfo.title}</div>
              <div>활동 기록이 저장되었습니다!</div>
            </div>
            <br />
            <div className="endedCrew_footer">
              <div className="endedCrew_buttons">
                <button
                  className="endedCrew_button"
                  onClick={
                    (endedCrewModalHandler,
                    () => {
                      document.location.href = '/mypage';
                    })
                  }
                >
                  확인
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="endedCrew_body">
              <div className="endedCrew_title">{crewInfo.title}</div>
              <div className="endedCrew_content">
                크루의 활동시간이 종료되었습니다.
              </div>
              <br />
            </div>
            <div className="endedCrew_footer">
              <div className="endedCrew_content">
                My MyHistory에 활동을 기록합니다.
              </div>
              <div className="endedCrew_buttons">
                <button className="endedCrew_button" onClick={recorded}>
                  예
                </button>
                <button className="endedCrew_button no" onClick={noRecorded}>
                  아니오
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EndedCrewModal;
