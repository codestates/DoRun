import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from '../Common/ConfirmModal/ConfirmModal';
import './CrewModal.scss';

const CrewModal = ({ crewModalHandler }) => {
  const [isFocused, setIsFocused] = useState('right_option');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const confirmModalHandler = () => {
    isConfirmModalOpen
      ? setIsConfirmModalOpen(false)
      : setIsConfirmModalOpen(true);
  };

  return (
    <div className="crewModalContainer">
      <div className="crewModal">
        <div className="crewModalHeader">
          <div className="crewModalExit" onClick={crewModalHandler}>
            x
          </div>
          <div className="crewTitle">여의도 10km 함께 뛰어요 :) </div>
        </div>

        <br />

        <div className="crewModalBody">
          <div className="bodyTop">
            <img className="leaderImg" src="defaultImg.png" alt="" />
          </div>
          <div className="bodyMid">
            <div className="mid_option">
              <div className="left_title">출발지</div>
              <div className="right_text">여의도 한강공원</div>
            </div>
            <div className="mid_option">
              <div className="left_title">크루 리더</div>
              <div className="right_text">영등포구청역 베타 테스터</div>
            </div>
            <div className="mid_option">
              <div className="left_title">DoRun 시간</div>
              <div className="right_text">19:30 ~ 21:00</div>
            </div>
            <div className="mid_option">
              <div className="left_title">모집인원</div>
              <div className="right_options">
                <div className="right_option focused">~5명</div>
                <div className="right_option">~10명</div>
                <div className="right_option">~15명</div>
              </div>
            </div>
            <div className="mid_option">
              <div className="left_title">난이도</div>
              <div className="right_options">
                <div className="right_option">쉬움</div>
                <div className="right_option focused">보통</div>
                <div className="right_option">어려움</div>
              </div>
            </div>
            <div className="mid_option">
              <div className="left_title">거리</div>
              <div className="right_options">
                <div className="right_option">~5km</div>
                <div className="right_option focused">~10km</div>
                <div className="right_option">15km~</div>
              </div>
            </div>
            <div className="mid_option">
              <div className="left_details">세부사항</div>
              <div className="right_details">
                한강 바람 맞으면서 @@ 방향으로 함께 뛸 Do Run 메이트 모집합니다!
                저녁에 추울 수 있으니 바람막이 필수로 지참하고 와주시면
                감사하겠습니다 :)
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="crewModalFooter">
          <button className="toDoRun" onClick={confirmModalHandler}>
            Do Run!!
          </button>
          <button className="toChat" onClick={confirmModalHandler}>
            Do Chat!!
          </button>
          {isConfirmModalOpen && (
            <ConfirmModal confirmModalHandler={confirmModalHandler} />
          )}
        </div>
        <br />
      </div>
    </div>
  );
};

export default CrewModal;

// ! controller
// const [crewModalPosition, setCrewModalPosition] = useState('down');
// const crewModalHandler = () => {
//   crewModalPosition === 'down'
//     ? setCrewModalPosition('up')
//     : setCrewModalPosition('down');
// };

// ! return
// <button
// onClick={() => {
//   setCrewModalPosition('up');
// }}
// >
// crewModal
// </button>

// <div className={crewModalPosition}>
//   <CrewModal crewModalHandler={crewModalHandler} />
// </div>;

// ! CSS
// .up {
//   position: fixed;
//   left: 20vw;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   transition: all 0.5s;
// }
// .down {
//   position: fixed;
//   left: 20vw;
//   top: 150%;
//   transform: translate(-50%, -50%);
//   transition: all 0.5s;
