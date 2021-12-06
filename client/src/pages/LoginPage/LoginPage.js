import './LoginPage.scss';
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../_actions/user_action';
import SocialLoginGoogle from '../../components/SocialLogin/Google';
import SocialLoginKakao from '../../components/SocialLogin/Kakao';
import ResetPassword from '../../components/_Modal/ResetPassword/ResetPassword';
import Footer from '../../components/Footer/Footer';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visibility, setVisibility] = useState('password');
  const [mismatched, setMismatched] = useState(false);

  const isVisible = () => {
    if (visibility === 'password') {
      setVisibility('text');
    } else {
      setVisibility('password');
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let body = {
      email: email,
      password: password,
    };
    dispatch(loginUser(body))
      .then((res) => {
        // console.log(res);
        if (res.payload.message === 'success') {
          document.location.href = '/';
        }
      })
      .catch((error) => {
        setMismatched(true);
      });
  };

  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const resetPasswordHandler = () => {
    isResetPasswordOpen
      ? setIsResetPasswordOpen(false)
      : setIsResetPasswordOpen(true);
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
            <label className="labelTitle">이메일</label>
            <div className="inputArea">
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>
            <label className="labelTitle">비밀번호</label>
            <div className="inputArea">
              <input
                className="input"
                type={visibility}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  fontFamily: 'GmarketSans',
                }}
              />
              <div className="showBtn" onClick={isVisible}>
                show
              </div>
            </div>
            <div className="reset_password" onClick={resetPasswordHandler}>
              비밀번호 재설정
            </div>
            <input
              type="submit"
              value="DoRun!"
              name="login"
              style={{ marginTop: '100px' }}
            />
            <div className="isRegisted">
              <span>아직 회원이 아니신가요?</span>
              <Link className="toRegister" to="/register">
                회원가입 하기
              </Link>
            </div>
            <div className="socialLogin">
              <div className="socialGoogle">
                <SocialLoginGoogle />
              </div>
              <div className="socialKakao">
                <SocialLoginKakao />
              </div>
            </div>
          </form>
          {isResetPasswordOpen && (
            <ResetPassword resetPasswordHandler={resetPasswordHandler} />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default withRouter(LoginPage);
