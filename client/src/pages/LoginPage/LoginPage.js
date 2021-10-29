import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import SocialLoginGoogle from '../../components/SocialLogin/Google';
import SocialLoginKakao from '../../components/SocialLogin/Kakao';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState('password');
  const [mismatched, setMismatched] = useState(false);
  const user = useSelector((state) => state.user);

  const isVisible = () => {
    if (visibility === 'password') {
      setVisibility('text');
    } else {
      setVisibility('password');
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      email: email,
      password: password,
    };

    dispatch(loginUser(body)).then((res) => {
      if (res.payload.message) {
        props.history.push('/');
      } else {
        setMismatched(true);
      }
    });
  };

  return (
    <>
      <div className="loginBlock">
        <div className="loginWrapper">
          <h1 className="loginTitle">Login</h1>

          <div className="errMsg">
            {mismatched ? '⚠ 이메일과 비밀번호를 확인해 주세요' : ''}
          </div>

          <form className="loginFrm" onSubmit={onSubmitHandler}>
            <label>이메일</label>
            <div className="inputArea">
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label>비밀번호</label>
            <div className="inputArea">
              <input
                className="input"
                type={visibility}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="showBtn" onClick={isVisible}>
                show
              </button>
            </div>
            <div className="findPassword">Forgot your password?</div>
            <input type="submit" name="login" style={{ marginTop: '100px' }} />

            <div className="isRegisted">
              <span>아직 회원이 아니신가요?</span>
              <Link className="toRegister" to="/register">
                회원가입 하기
              </Link>
              <SocialLoginGoogle />
              <SocialLoginKakao />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withRouter(LoginPage);
