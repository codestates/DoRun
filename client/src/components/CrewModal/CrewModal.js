import React, { useState, useEffect } from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import axios from 'axios';
import './CrewModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { joinCrew } from '../../_actions/crew_action';

const CrewModal = ({ crewModalHandler, crewId }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const userCrewId = useSelector((state) => state.user.userCrewId);
  const [errMsg, setErrMsg] = useState('');
  const [crewData, setCrewData] = useState({
    title: '',
    date: '',
    departure: '',
    time: '',
    participant: [],
    personnel: '',
    level: '',
    distance: '',
    desc: '',
  });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  //!클릭한 위치가 바뀔때 마다 모달 정보 수정
  useEffect(async () => {
    if (crewId !== 0) {
      await axios
        .get(`${process.env.REACT_APP_SERVER}/crew/${crewId}`)
        .then((res) => {
          console.log('크루 모달의 응답 정보', res.data);
          setCrewData({
            ...res.data.data,
            participant: res.data.CrewInUser,
          });
        });
    }

  }, [crewId]);

  // 크루가입이 가능한지 확인
  const joinCheck = () => {
    if (
      crewData.participant.length === Number(crewData.personnel.slice(1, 3))
    ) {
      // console.log(crewData);
      setErrMsg(<div className="crewErrMsg">⚠ 크루인원이 가득 찼습니다!!</div>);
    } else {
      setErrMsg(null);
      if (!userId) {
        setIsConfirmModalOpen(true);
      } else if (!userCrewId) {
        // 크루 가입 요청
        dispatch(joinCrew(userId, crewId)).then((res) => {
          confirmModalHandler();
        });
      } else {
        setErrMsg(
          <div className="crewErrMsg">⚠ 이미 가입한 크루가 존재합니다!!</div>
        );
      }
    }
  };

  // 결과 확인 모달

  const confirmModalHandler = () => {
    isConfirmModalOpen
      ? setIsConfirmModalOpen(false)
      : setIsConfirmModalOpen(true);
  };

  return (
    <div className="crewModalContainer">
      {/* {console.log(crewData)} */}
      <div className="crewModal">
        <div className="crewModalHeader">
          <div className="crewModalExit" onClick={crewModalHandler}>
            x
          </div>
        </div>

        <div className="crewModalBody">
          <div className="bodyTop">
            <div className="crewTitle">{crewData.title}</div>
            <hr />
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
                <ConfirmModal
                  confirmModalHandler={confirmModalHandler}
                  userId={userId}
                />
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
