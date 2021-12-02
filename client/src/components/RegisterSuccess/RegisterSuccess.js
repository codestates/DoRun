import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterSuccess.scss';

const RegisterSuccess = () => {
  return (
    <div className="msgWrapper">
      <h1>인증메일을 전송하였습니다.</h1>
      <h3>인증 메일을 확인하여 회원가입을 완료해주세요.</h3>
      <Link to="/login">
        <button className="msgBtn" type="button">
          로그인 하기
        </button>
      </Link>
    </div>
  );
};

export default RegisterSuccess;
