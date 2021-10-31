import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SuccessModal from '../SuccessModal/SuccessModal';
import './CreateModal.scss';

const CreateModal = ({ createModalHandler }) => {
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
              <input className="right_input" type="text" />
            </div>
            <div className="mid_options">
              <div className="left_title">장소</div>
              <input className="right_input" type="text" />
            </div>
            <div className="mid_options">
              <div className="left_title">DoRun 시간</div>
              <label className="right_time">
                <input className="time" type="time" name="time" />
                ~
                <input className="time" type="time" name="time" />
              </label>
            </div>
            <div className="mid_options">
              <div className="left_title">모집인원</div>
              <div className="right_radios">
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
              <div className="right_radios">
                <label className="right_radio">
                  <input
                    className="radios"
                    type="radio"
                    name="level"
                    value="easy"
                  />
                  쉬움
                </label>
                <label className="right_radio">
                  <input
                    className="radios"
                    type="radio"
                    name="level"
                    value="normal"
                  />
                  보통
                </label>
                <label className="right_radio">
                  <input
                    className="radios"
                    type="radio"
                    name="level"
                    value="hard"
                  />
                  어려움
                </label>
              </div>
            </div>
            <div className="mid_options">
              <div className="left_title">거리</div>
              <div className="right_radios">
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
              <textarea className="right_textarea" />
            </div>
          </div>

          <br />
          <div className="createModalFooter">
            <button className="toCreate" onClick={SuccessModalHandler}>
              Create !!
            </button>
            {isSuccessModalOpen && (
              <SuccessModal SuccessModalHandler={SuccessModalHandler} />
            )}
          </div>
          <br />
        </div>
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
