import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createCrew } from '../../_actions/crew_action';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import SuccessModal from '../SuccessModal/SuccessModal';
import './CreateModal.scss';

const CreateModal = ({ createModalHandler, location }) => {
  // console.log('create Modal페이지입니다', location)
  const userId = Number(sessionStorage.getItem('userId'));
  const today = new Date().toISOString().slice(0, 10);
  const dispatch = useDispatch();
  const [createData, setCreateData] = useState({
    title: '',
    departure: '',
    date: today,
    startTime: '',
    endTime: '',
    personnel: '',
    level: '',
    distance: '',
    desc: '',
  });
  // console.log(createData)
  const [isEnough, setIsEnough] = useState(false);

  const onSubmitHandler = () => {
    let body = {
      ...createData,
      time: `${createData.startTime} ~ ${createData.endTime}`,
      userId: userId,
      locationMa: location.Ma,
      locationLa: location.La,
    };

    if (
      !createData.title ||
      !createData.departure ||
      !createData.date ||
      !createData.startTime ||
      !createData.endTime ||
      !createData.personnel ||
      !createData.level ||
      !createData.distance ||
      !createData.desc
    ) {
      setIsEnough(true);
    } else {
      setIsEnough(false);
      if (userId) {
        dispatch(createCrew(body))
          .then((res) => {
            if (res.payload.data.message === 'success') {
              // console.log('유저가 갖게 될 크루 아이디입니다', res.payload.data.data.id)
              sessionStorage.setItem('userCrewId', res.payload.data.data.id);
              SuccessModalHandler();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        confirmModalHandler();
      }
    }
  };

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const confirmModalHandler = () => {
    isConfirmModalOpen
      ? setIsConfirmModalOpen(false)
      : setIsConfirmModalOpen(true);
  };

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const SuccessModalHandler = () => {
    isSuccessModalOpen
      ? setIsSuccessModalOpen(false)
      : setIsSuccessModalOpen(true);
  };

  return (
    <div className="createModalContainer">
      <div className="createModal">
        <div className="createModalHeader">
          <div className="createModalExit" onClick={createModalHandler}>
            x
          </div>
        </div>

        <div className="createModalBody">
          <div className="bodyTop">
            <div className="createTitle">DoRun 크루 생성하기</div>
            <br />
          </div>
          <div className="cbodyMid">
            <div className="mid_options">
              <div className="left_title">제목</div>
              <input
                className="right_input"
                type="text"
                maxlength="16"
                onChange={(e) => {
                  setCreateData({ ...createData, title: e.target.value });
                }}
              />
            </div>
            <div className="mid_options">
              <div className="left_title">출발지</div>
              <input
                className="right_input"
                type="text"
                maxlength="15"
                onChange={(e) => {
                  setCreateData({ ...createData, departure: e.target.value });
                }}
              />
            </div>
            <div className="mid_options">
              <div className="left_title">날짜</div>
              <label className="right_date">
                <div value="date">
                  <input
                    className="date"
                    type="date"
                    name="date"
                    value={createData.date}
                    onChange={(e) => {
                      setCreateData({
                        ...createData,
                        date: e.target.value,
                      });
                    }}
                  />
                </div>
              </label>
            </div>
            <div className="mid_options">
              <div className="left_title">시간</div>
              <label className="right_time">
                <input
                  className="time"
                  type="time"
                  name="startTime"
                  onChange={(e) => {
                    setCreateData({
                      ...createData,
                      startTime: e.target.value,
                    });
                  }}
                />
                &nbsp;~&nbsp;
                <input
                  className="time"
                  type="time"
                  name="endTime"
                  onChange={(e) => {
                    setCreateData({ ...createData, endTime: e.target.value });
                  }}
                />
              </label>
            </div>
            <div className="mid_options">
              <div className="left_title">모집인원</div>
              <div
                className="right_radios"
                onChange={(e) => {
                  setCreateData({ ...createData, personnel: e.target.value });
                }}
              >
                <label className="right_radio">
                  <input
                    className="radios"
                    type="radio"
                    name="personnel"
                    value="~5명"
                  />
                  ~5명
                </label>
                <label className="right_radio">
                  <input
                    className="radios"
                    type="radio"
                    name="personnel"
                    value="~10명"
                  />
                  ~10명
                </label>
                <label className="right_radio">
                  <input
                    className="radios"
                    type="radio"
                    name="personnel"
                    value="~15명"
                  />
                  ~15명
                </label>
              </div>
            </div>
            <div className="mid_options">
              <div className="left_title">난이도</div>
              <div
                className="right_radios"
                onClick={(e) => {
                  setCreateData({ ...createData, level: e.target.value });
                }}
              >
                <label className="right_radio">
                  <input
                    className="radios"
                    type="radio"
                    name="level"
                    value="쉬움"
                  />
                  쉬움
                </label>
                <label className="right_radio">
                  <input
                    className="radios"
                    type="radio"
                    name="level"
                    value="보통"
                  />
                  보통
                </label>
                <label className="right_radio">
                  <input
                    className="radios"
                    type="radio"
                    name="level"
                    value="어려움"
                  />
                  어려움
                </label>
              </div>
            </div>
            <div className="mid_options">
              <div className="left_title">거리</div>
              <div
                className="right_radios"
                onChange={(e) => {
                  setCreateData({ ...createData, distance: e.target.value });
                }}
              >
                <label className="right_radio">
                  <input
                    className="radios"
                    type="radio"
                    name="distance"
                    value="~5km"
                  />
                  ~5km
                </label>

                <label className="right_radio">
                  <input
                    className="radios"
                    type="radio"
                    name="distance"
                    value="~10km"
                  />
                  ~10km
                </label>
                <label className="right_radio">
                  <input
                    className="radios"
                    type="radio"
                    name="distance"
                    value="15km~"
                  />
                  15km~
                </label>
              </div>
            </div>
            <div className="mid_options">
              <div className="left_details">세부사항</div>
              <textarea
                className="right_textarea"
                onChange={(e) => {
                  setCreateData({ ...createData, desc: e.target.value });
                }}
              />
            </div>
          </div>
          {isEnough && (
            <div className="crewErrMsg">⚠ 크루정보를 모두 입력해주세요!!</div>
          )}
          <br />
          <div className="createModalFooter">
            <button className="toCreate" onClick={onSubmitHandler}>
              Create !!
            </button>
            {isConfirmModalOpen && (
              <ConfirmModal
                confirmModalHandler={confirmModalHandler}
                userId={userId}
              />
            )}
            {isSuccessModalOpen && (
              <SuccessModal SuccessModalHandler={SuccessModalHandler} />
            )}
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default CreateModal;

// ! controller
// const [createModalPosition, setCreateModalPosition] = useState('createDown');
// const createModalHandler = () => {
//   createModalPosition === 'createDown'
//     ? setCreateModalPosition('createUp')
//     : setCreateModalPosition('createDown');
// };

// ! return
// <button
// onClick={() => {
//   setCreateModalPosition('createUp');
// }}
// >
// createModal
// </button>

// <div className={createModalPosition}>
//   <CreateModal createModalHandler={createModalHandler} />
// </div>;

// ! CSS
// .createUp {
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

// .createDown {
//   position: fixed;
//   left: 20%;
//   top: 150%;
//   transform: translate(-50%, -50%);
//   transition: all 0.5s;
// }

// @media screen and (max-width: 1023px) {
//   .createUp {
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

//   .createDown {
//     position: fixed;
//     left: 30%;
//     top: 150%;
//     transform: translate(-50%, -50%);
//     transition: all 0.5s;
//   }
// }

// @media screen and (max-width: 768px) {
//   .createUp {
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
//   .createDown {
//     position: fixed;
//     left: 50%;
//     top: 150%;
//     transform: translate(-50%, -50%);
//     transition: all 0.5s;
//   }
// }
