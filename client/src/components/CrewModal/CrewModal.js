import React, { useState, useEffect } from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import axios from 'axios';
import './CrewModal.scss';

const CrewModal = ({ crewModalHandler, crewId }) => {
  const [errMsg, setErrMsg] = useState('');
  const [crewData, setCrewData] = useState({
    title: '여의도 10km 함께 뛰어요 :)',
    date: '2021-11-01',
    departure: '여의도 한강공원',
    time: '19:30 ~ 21:00',
    participant: [1, 2, 3, 4, 5],
    personnel: '~5명',
    level: '어려움',
    distance: '~5km',
    desc: '한강 바람 맞으면서 @@ 방향으로 함께 뛸 Do Run 메이트 모집합니다! 저녁에 추울 수 있으니 바람막이 필수로 지참하고 와주시면 감사하겠습니다 :)',
  });

  // 클릭한 위치가 바뀔때 마다 모달 정보 수정
  // useEffect(() => {
  //   axios.get('http://localhost:3000/crew', crewId).then((res) => {
  //     setCrewData({
  //       ...res.data,
  //     });
  //     if (crewData.participant.length === crewData.personnel.slice(1, 2)) {
  //       setBtnActive('disabled');
  //     }
  //   });
  // }, [crewId]);

  // 크루 가입 확인
  const joinCheck = () => {
    if (
      crewData.participant.length === Number(crewData.personnel.slice(1, 2))
    ) {
      setErrMsg(<div className="crewErrMsg">⚠ 크루인원이 가득 찼습니다!!</div>);
    } else {
      setErrMsg(null);
      confirmModalHandler();
    }
  };

  // 로그인 페이지 이동 모달
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
        </div>

        <div className="crewModalBody">
          <div className="bodyTop">
            <div className="crewTitle">{crewData.title}</div>
            <br />
            {/* <img className="leaderImg" src={crewData.leaderImg} alt="" /> */}
          </div>
          <div className="bodyMid">
            {/* <div className="mid_option">
              <div className="left_title">크루 리더</div>
              <div className="right_text">{crewData.leader}</div>
            </div> */}
            <div className="mid_option">
              <div className="left_title">출발지</div>
              <div className="right_text">{crewData.departure}</div>
            </div>
            <div className="mid_option">
              <div className="left_title">날짜</div>
              <div className="right_text">{crewData.date}</div>
            </div>
            <div className="mid_option">
              <div className="left_title">시간</div>
              <div className="right_text">{crewData.time}</div>
            </div>
            <div className="mid_option">
              <div className="left_title">모집인원</div>
              <div className="right_options">
                <div className="right_text">
                  {crewData.participant.length}
                  명&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                  {crewData.personnel.slice(1)}
                </div>
              </div>
            </div>
            <div className="mid_option">
              <div className="left_title">난이도</div>
              <div className="right_options">
                {crewData.level === '쉬움' ? (
                  <>
                    <div className="right_option focused">쉬움</div>
                    <div className="right_option">보통</div>
                    <div className="right_option">어려움</div>
                  </>
                ) : crewData.level === '보통' ? (
                  <>
                    <div className="right_option">쉬움</div>
                    <div className="right_option focused">보통</div>
                    <div className="right_option">어려움</div>
                  </>
                ) : (
                  <>
                    <div className="right_option">쉬움</div>
                    <div className="right_option">보통</div>
                    <div className="right_option focused">어려움</div>
                  </>
                )}
              </div>
            </div>
            <div className="mid_option">
              <div className="left_title">거리</div>
              <div className="right_options">
                {crewData.distance === '~5km' ? (
                  <>
                    <div className="right_option focused">~5km</div>
                    <div className="right_option">~10km</div>
                    <div className="right_option">15km~</div>
                  </>
                ) : crewData.distance === '~10km' ? (
                  <>
                    <div className="right_option">~5km</div>
                    <div className="right_option focused">~10km</div>
                    <div className="right_option">15km~</div>
                  </>
                ) : (
                  <>
                    <div className="right_option">~5km</div>
                    <div className="right_option">~10km</div>
                    <div className="right_option focused">15km~</div>
                  </>
                )}
              </div>
            </div>
            <div className="mid_option">
              <div className="left_details">세부사항</div>
              <div className="right_details">{crewData.desc}</div>
            </div>
            <br />

            <div className="crewModalFooter">
              {errMsg}
              <button className="toDoRun" onClick={joinCheck}>
                Do Run!!
              </button>
              {isConfirmModalOpen && (
                <ConfirmModal confirmModalHandler={confirmModalHandler} />
              )}
            </div>
            <br />
          </div>
        </div>
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
//   left: 20%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   transition: all 0.5s;
//   padding: 10px;
//   box-shadow: -2px 2px 10px 10px rgba(107, 107, 107, 0.2);
//   border-radius: 10px;
//   background-color: #f8f9fa;
//   z-index: 9000;
// }

// .down {
//   position: fixed;
//   left: 20%;
//   top: 150%;
//   transform: translate(-50%, -50%);
//   transition: all 0.5s;
// }

// @media screen and (max-width: 1023px) {
//   .up {
//     position: fixed;
//     left: 30%;
//     top: 50%;
//     transform: translate(-50%, -50%);
//     transition: all 0.5s;
//     padding: 10px;
//     box-shadow: -2px 2px 10px 10px rgba(107, 107, 107, 0.2);
//     border-radius: 10px;
//     background-color: #f8f9fa;
//   }

//   .down {
//     position: fixed;
//     left: 30%;
//     top: 150%;
//     transform: translate(-50%, -50%);
//     transition: all 0.5s;
//   }
// }

// @media screen and (max-width: 768px) {
//   .up {
//     position: fixed;
//     left: 50%;
//     top: 72%;
//     transform: translate(-50%, -50%);
//     transition: all 0.5s;
//     padding: 10px;
//     box-shadow: -2px 2px 10px 10px rgba(107, 107, 107, 0.2);
//     border-radius: 10px;
//     background-color: #f8f9fa;
//   }
//   .down {
//     position: fixed;
//     left: 50%;
//     top: 150%;
//     transform: translate(-50%, -50%);
//     transition: all 0.5s;
//   }
// }
