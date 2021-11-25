import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EmailModal from '../EmailModal/EmailModal';
import axios from 'axios';
import './EmailVerification.scss';

const EmailVerification = () => {
  const userInfo = useSelector((state) => state.user);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const emailModalHandler = () => {
    isEmailModalOpen ? setIsEmailModalOpen(false) : setIsEmailModalOpen(true);
  };

  const reSendEmail = () => {
    let body = {
      userId: userInfo.userId,
      email: userInfo.email,
    };
    axios
      .post(`${process.env.REACT_APP_SERVER}/user/confirm_email`, body)
      .then((res) => {
        console.log(res);
        if (res.data.data.message === 'success') {
          emailModalHandler();
        }
      });
  };

  return (
    <>
      {userInfo.isauth ? (
        <div className="email_verification">
          {userInfo.email} 이메일 인증 완료
        </div>
      ) : (
        <div className="email_resend" onClick={reSendEmail}>
          {userInfo.email} 이메일 인증 재발송
        </div>
      )}
      {isEmailModalOpen && <EmailModal />}
    </>
  );
};

export default EmailVerification;
