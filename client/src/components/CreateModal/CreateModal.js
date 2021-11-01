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
              <div className="left_title">DoRun 날짜</div>
              <label className="right_date">
                <input type="date" name="date" className="date" />
              </label>
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
                <div class="radio radio_1">
                  <input id="radio-1" name="headcount" type="radio" />
                  <label for="radio-1" className="right_radio">
                    ~ 5명
                  </label>
                </div>

                <div class="radio radio_1">
                  <input id="radio-2" name="headcount" type="radio" />
                  <label for="radio-2" className="right_radio">
                    ~10명
                  </label>
                </div>
                <div class="radio radio_1">
                  <input id="radio-3" name="headcount" type="radio" />
                  <label for="radio-3" className="right_radio">
                    ~15명
                  </label>
                </div>
              </div>
            </div>
            <div className="mid_options">
              <div className="left_title">난이도</div>
              <div className="right_radios">
                <div class="radio radio_2">
                  <input id="radio-4" name="level" type="radio" />
                  <label for="radio-4" className="right_radio">
                    쉬움
                  </label>
                </div>

                <div class="radio radio_2">
                  <input id="radio-5" name="level" type="radio" />
                  <label for="radio-5" className="right_radio">
                    보통
                  </label>
                </div>
                <div class="radio radio_2">
                  <input id="radio-6" name="level" type="radio" />
                  <label for="radio-6" className="right_radio">
                    어려움
                  </label>
                </div>
              </div>
            </div>
            <div className="mid_options">
              <div className="left_title">거리</div>
              <div className="right_radios">
                <div class="radio radio_3">
                  <input id="radio-7" name="distance" type="radio" />
                  <label for="radio-7" className="right_radio">
                    ~5km
                  </label>
                </div>

                <div class="radio radio_3">
                  <input id="radio-8" name="distance" type="radio" />
                  <label for="radio-8" className="right_radio">
                    ~10km
                  </label>
                </div>
                <div class="radio radio_3">
                  <input id="radio-9" name="distance" type="radio" />
                  <label for="radio-9" className="right_radio">
                    15km
                  </label>
                </div>
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
