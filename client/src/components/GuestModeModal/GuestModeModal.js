import React from 'react';
import './GuestModeModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { guestUser, logoutUser } from '../../_actions/user_action';

function GuestModeModal({ guestMode, setGuestMode }) {

  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user.userId);

  const guestModeCancel = () => {
    setGuestMode(false)
  }

  const guestModeHandler = () => {
    dispatch(guestUser())
      .then((res) => {
        if (res.payload.Message === "success") {
          document.location.href = '/';
        }
      })
      .catch((e) => console.log(e));
  }

  const guestModalRegister = () => {
    document.location.href = '/register';
  }

  return (
    <>
      {guestMode ?
        <div className="guestModalWrapper">
          <div className="guestModalCancel" onClick={guestModeCancel}> X </div>
          <div className="guestModal">
            게스트 모드 사용은 <br /> 30분의 시간 제한이 있습니다.
          </div>
          <div className="guestModeBtns">
            <div className="guestModeYes" onClick={guestModeHandler}> 동의하고 시작하기</div>
            <div className="guestModeNo" onClick={guestModalRegister}> 회원가입 하러가기</div>
          </div>
        </div> : ''}
    </>
  )
}

export default GuestModeModal
