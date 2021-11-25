import React, { useState } from 'react';
import axios from 'axios';
import './ResetPassword.scss';

const ResetPassword = ({ resetPasswordHandler }) => {
  const [email, setEmail] = useState('');
  const [clicked, setClicked] = useState(false);
  const [passed, setPassed] = useState(false);

  const submitHandler = () => {
    let body = {
      email: email,
    };
    axios
      .patch(`${process.env.REACT_APP_SERVER}/user/reset_password`, body)
      .then((res) => {
        console.log(res);
        setClicked(true);
        if (res.data.data.message === 'success') {
          setPassed(true);
        } else {
          setPassed(false);
        }
      });
    // setClicked(true);
    // if (email.includes('@') && email.includes('.')) {
    //   setPassed(true);
    // } else {
    //   setPassed(false);
    // }
  };
  return (
    <div className="resetPasswordContainer">
      <div className="resetPassword">
        <div className="resetPassword_header">
          <div className="resetPassword_exit" onClick={resetPasswordHandler}>
            X
          </div>
        </div>
        <div className="resetPassword_title">Reset Password</div>
        <div className="resetPassword_body">
          <div className="resetPassword_text">
            이메일 입력 후 제출 시, 해당 이메일로
          </div>
          <div className="resetPassword_text">
            재설정 된 임시 비밀번호가 전송됩니다.
          </div>
          <div className="resetPassword_inputArea">
            <label className="resetPassword_label">이메일</label>
            <input
              className="resetPassword_input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="resetPassword_footer">
          {clicked &&
            (passed ? (
              <>
                <div className="resetPassword_passed">{email} 으로 </div>
                <div className="resetPassword_passed">
                  임시 비밀번호를 전송했습니다.
                </div>
              </>
            ) : (
              <div className="resetPassword_nonpassed">
                ⚠ 입력한 이메일을 다시 확인해 주세요!
              </div>
            ))}
          <button className="resetPassword_btn" onClick={submitHandler}>
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
